from rest_framework import serializers

from apps.reviews.serializers import RetrieveReviewSerializer
from apps.photos.serializers import RetrievePhotoSerializer
from ..models import EventRental
from .rental_status_history_serializer import RentalStatusHistorySerializer
from .service_event_rental_serializers import RetrieveServiceEventRentalSerializer

class RetrieveEventRentalSerializer(serializers.ModelSerializer):
    photos = RetrievePhotoSerializer(many=True, read_only=True)
    status_history = RentalStatusHistorySerializer(many=True, read_only=True)
    owner_rating = RetrieveReviewSerializer(read_only=True)
    costumer_rating = RetrieveReviewSerializer(read_only=True)
    current_status = RentalStatusHistorySerializer(read_only=True)
    event_rental_services = RetrieveServiceEventRentalSerializer(many=True, read_only=True)
    event_rental_cost = serializers.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        model = EventRental
        fields = "__all__"
        read_only_fields = [field.name for field in model._meta.fields] 

