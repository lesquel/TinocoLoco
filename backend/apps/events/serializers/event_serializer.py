from rest_framework import serializers
from apps.events.models import Event

from base.utils import errors

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

    def validate_event_reference_value(self, value):
        if value < 0:
            raise errors.EventReferenceValueError()
        return value
    
    def validate_event_allowed_hours(self, value):
        if value < 0:
            raise errors.EventAllowedHoursError()
        return value

    def validate_event_extra_hour_rate(self, value):
        if value < 0:
            raise errors.EventExtraHourRateError()
        return value