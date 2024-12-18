from rest_framework import serializers
from events.models import Event

from photos.serializers import RetrievePhotoSerializer


class EventSerializer(serializers.ModelSerializer):
    photos = RetrievePhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = "__all__"

        read_only_fields = (
            "id",
            "creation_date",
            "last_actualization_date",
            "photos",
            "visualizations",
        )
