from rest_framework import serializers
from photos.serializers import RetrievePhotoSerializer

from ..models import Event


class EventSerializer(serializers.ModelSerializer):
    photos = RetrievePhotoSerializer(many=True, read_only=True)
    class Meta:
        model = Event
        fields = "__all__"
