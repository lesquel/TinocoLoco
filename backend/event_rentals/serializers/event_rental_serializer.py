from rest_framework import serializers

from reviews.serializers import RetrieveReviewSerializer
from photos.serializers import RetrievePhotoSerializer
from ..models import EventRental


class EventRentalSerializer(serializers.ModelSerializer):
    photos = RetrievePhotoSerializer(many=True, read_only=True)

    owner_rating = RetrieveReviewSerializer(read_only=True)
    costumer_rating = RetrieveReviewSerializer(read_only=True)

    class Meta:
        model = EventRental
        fields = "__all__"
