from rest_framework import serializers

from apps.reviews.serializers import RetrieveReviewSerializer
from apps.photos.serializers import RetrievePhotoSerializer


from ..models import EventRental
from .rental_status_history_serializer import RentalStatusHistorySerializer
from ..messages import ERROR_MESSAGES

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
            "view_count",
            "confirmation_code",
            "owner_rating",
            "costumer_rating",
            "current_status",
        )

    def validate(self, attrs):
        if attrs.get("event_rental_planified_end_time") <= attrs.get("event_rental_start_time"):
            raise serializers.ValidationError(
                ERROR_MESSAGES["INVALID_START_END_DATE"]
            )
            
        if attrs.get("event_rental_end_time") <= attrs.get("event_rental_start_time"):
            raise serializers.ValidationError(
                ERROR_MESSAGES["INVALID_START_END_DATE"]
            )
        return attrs
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['owner'] = request.user
        return super().create(validated_data)