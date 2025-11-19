from rest_framework import serializers
from .models import UploadSummary

class UploadSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadSummary
        fields = '__all__'