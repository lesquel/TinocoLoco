from rest_framework import serializers

from apps.reviews.serializers import RetrieveReviewSerializer
from apps.photos.serializers import RetrievePhotoSerializer
from ..models import EventRental
from .rental_status_history_serializer import RentalStatusHistorySerializer
from apps.contingencies.serializers import ContingencySerializer


class RetrieveEventRentalSerializer(serializers.ModelSerializer):
    photos = RetrievePhotoSerializer(many=True, read_only=True)
    owner_rating = RetrieveReviewSerializer(read_only=True)
    costumer_rating = RetrieveReviewSerializer(read_only=True)
    current_status = RentalStatusHistorySerializer(read_only=True)
    event_rental_cost = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )

    class Meta:
        model = EventRental
        fields = [
            "id",
            "view_count",
            "event",
            "owner",
            "event_rental_date",
            "event_rental_start_time",
            "event_rental_planified_end_time",
            "event_rental_end_time",
            "event_rental_cancelled_value_in_advance",
            "event_rental_payment_method",
            "event_rental_observation",
            "event_rental_min_attendees",
            "event_rental_max_attendees",
            "event_rental_creation_date",
            "promotion",
            "contingencies",
            "event_rental_services",
            "event_rental_cost",
            "photos",
            "owner_rating",
            "costumer_rating",
            "current_status",
        ]
        read_only_fields = fields
