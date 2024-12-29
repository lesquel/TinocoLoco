from rest_framework import serializers
from apps.services.models import Service
from apps.photos.serializers import RetrievePhotoSerializer
from apps.reviews.models import Review

class ServiceSerializer(serializers.ModelSerializer):
    photos = RetrievePhotoSerializer(many=True, read_only=True)
    avg_rating = serializers.SerializerMethodField()
    class Meta:
        model = Service
        fields = "__all__" 
        
        read_only_fields = ["id", "creation_date", "photos", "view_count"]

    def get_avg_rating(self, obj):
        return Review.avg_rating_for_object(obj)
