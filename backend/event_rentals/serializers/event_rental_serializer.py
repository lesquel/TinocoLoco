from rest_framework import serializers

from reviews.serializers import RetrieveReviewSerializer
from photos.serializers import RetrievePhotoSerializer


from ..models import EventRental
from .rental_status_history_serializer import RentalStatusHistorySerializer


class EventRentalSerializer(serializers.ModelSerializer):
    photos = RetrievePhotoSerializer(many=True, read_only=True)

    status_history = RentalStatusHistorySerializer(many=True, read_only=True)

    owner_rating = RetrieveReviewSerializer(read_only=True)
    costumer_rating = RetrieveReviewSerializer(read_only=True)

    
    current_status = RentalStatusHistorySerializer(read_only=True)
    class Meta:
        model = EventRental
        fields = "__all__"

        read_only_fields = (
            "owner",
            "visualizations",
            "confirmation_code",
            "owner_rating",
            "costumer_rating",
            "current_status",
        )

