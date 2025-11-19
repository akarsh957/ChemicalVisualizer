from django.urls import path
from .views import UploadAnalysisView, HistoryView, PDFReportView

urlpatterns = [
    path('upload/', UploadAnalysisView.as_view(), name='upload-analysis'),
    path('history/', HistoryView.as_view(), name='history'),
    path('report/<int:pk>/', PDFReportView.as_view(), name='pdf-report'),
]