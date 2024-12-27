from rest_framework import serializers
import datetime


from base.utils import errors
from ..models import EventRental


class BaseEventRentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRental
        fields = "__all__"

    def validate_event_rental_cancelled_value_in_advance(self, value):
        if value < 0:
            raise errors.ValueCancellationInAdvanceMustBeGreaterThanZeroError()
        return value

    def validate_event_rental_date(self, value):
        if value < datetime.date.today():
            raise errors.EventRentalDateCannotBeLessThanTodayError()
        if value < datetime.date.today() + datetime.timedelta(days=3):
            raise errors.EventRentalDateMustBeAtLeastThreeDaysInAdvanceError()
        return value
