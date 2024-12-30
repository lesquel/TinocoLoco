from rest_framework import serializers


from apps.services.models import Service
from apps.photos.serializers import RetrievePhotoSerializer
from apps.reviews.models import Review

from base.system_services import EventRentalService

class ServiceSerializer(serializers.ModelSerializer):
    photos = RetrievePhotoSerializer(many=True, read_only=True)
    avg_rating = serializers.SerializerMethodField()
    reservation_count = serializers.SerializerMethodField()
    class Meta:
        model = Service
        fields = "__all__" 
        
        read_only_fields = ["id", "creation_date", "photos", "view_count", "avg_rating", "reservation_count"]

    def get_avg_rating(self, obj):
        return Review.avg_rating_for_object(obj)
    
    def get_reservation_count(self, obj):
        return EventRentalService.get_reservation_count("event_rental_services__service", obj)
