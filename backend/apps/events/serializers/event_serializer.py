from rest_framework import serializers
from apps.events.models import Event

from apps.photos.serializers import RetrievePhotoSerializer


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
            "view_count",
        )
