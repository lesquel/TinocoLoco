from ..models import EventRental

from .base_event_rental_serializer import BaseEventRentalSerializer

class UpdateEventRentalSerializer(BaseEventRentalSerializer):
    class Meta:
        model = EventRental
        fields = [
            "event",
            "event_rental_date",
            "event_rental_start_time",
            "event_rental_planified_end_time",
            "event_rental_cancelled_value_in_advance",
            "event_rental_payment_method",
            "event_rental_min_attendees",
            "event_rental_max_attendees",
            "promotion",
        ]

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
