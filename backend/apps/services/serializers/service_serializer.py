from rest_framework import serializers
from apps.services.models import Service

from apps.photos.serializers import RetrievePhotoSerializer
class ServiceSerializer(serializers.ModelSerializer):
    photos = RetrievePhotoSerializer(many=True, read_only=True)
    class Meta:
        model = Service
        fields = "__all__"
        
        read_only_fields = ["id", "creation_date", "photos", "view_count"]
