from django.http import HttpResponse
from .models import UploadSummary
from .serializers import UploadSummarySerializer
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
import pandas as pd
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch

class UploadAnalysisView(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        csv_file = request.FILES.get('file')
        if not csv_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        if not csv_file.name.endswith('.csv'):
            return Response({"error": "This is not a CSV file"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            df = pd.read_csv(csv_file)
            total_count = len(df)
            avg_flowrate = df['Flowrate'].mean()
            avg_pressure = df['Pressure'].mean()
            avg_temperature = df['Temperature'].mean()
            type_distribution = df['Type'].value_counts().to_dict()

            summary_entry = UploadSummary.objects.create(
                file_name=csv_file.name,
                total_count=total_count,
                avg_flowrate=round(avg_flowrate, 2),
                avg_pressure=round(avg_pressure, 2),
                avg_temperature=round(avg_temperature, 2),
                type_distribution=type_distribution
            )
            
            old_summaries = UploadSummary.objects.all()[5:]
            for old in old_summaries:
                old.delete()

            response_data = {
                'file_info': {'name': csv_file.name, 'total_count': total_count},
                'summary_stats': {
                    'avg_flowrate': round(avg_flowrate, 2),
                    'avg_pressure': round(avg_pressure, 2),
                    'avg_temperature': round(avg_temperature, 2),
                },
                'type_distribution': type_distribution,
                'raw_data': df.to_dict('records')
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class HistoryView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UploadSummary.objects.all()[:5]
    serializer_class = UploadSummarySerializer

class PDFReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            summary = UploadSummary.objects.get(pk=pk)
        except UploadSummary.DoesNotExist:
            return Response({"error": "Summary not found"}, status=status.HTTP_404_NOT_FOUND)

        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter
        
        p.setFont("Helvetica-Bold", 16)
        p.drawString(1 * inch, 10 * inch, "Equipment Analysis Report")
        p.setFont("Helvetica", 12)
        p.drawString(1 * inch, 9.5 * inch, f"File Name: {summary.file_name}")
        p.drawString(1 * inch, 9.2 * inch, f"Uploaded At: {summary.uploaded_at.strftime('%Y-%m-%d %H:%M')}")
        
        p.setFont("Helvetica-Bold", 14)
        p.drawString(1 * inch, 8.7 * inch, "Summary Statistics")
        y = 8.4 * inch
        p.setFont("Helvetica", 12)
        p.drawString(1.2 * inch, y, f"Total Count: {summary.total_count}")
        y -= 0.3 * inch
        p.drawString(1.2 * inch, y, f"Avg. Flowrate: {summary.avg_flowrate}")
        y -= 0.3 * inch
        p.drawString(1.2 * inch, y, f"Avg. Pressure: {summary.avg_pressure}")
        y -= 0.3 * inch
        p.drawString(1.2 * inch, y, f"Avg. Temperature: {summary.avg_temperature}")
        
        p.setFont("Helvetica-Bold", 14)
        y -= 0.5 * inch
        p.drawString(1 * inch, y, "Equipment Distribution")
        y -= 0.3 * inch
        p.setFont("Helvetica", 12)
        if summary.type_distribution:
            for eq_type, count in summary.type_distribution.items():
                p.drawString(1.2 * inch, y, f"{eq_type}: {count}")
                y -= 0.3 * inch
        else:
            p.drawString(1.2 * inch, y, "No distribution data.")
            
        p.showPage()
        p.save()
        
        buffer.seek(0)
        response = HttpResponse(buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="report_{summary.id}.pdf"'
        return response