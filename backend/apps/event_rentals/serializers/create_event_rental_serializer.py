from rest_framework import serializers


from ..models import EventRental


class CreateEventRentalSerializer(serializers.ModelSerializer):
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

    def create(self, validated_data):
        validated_data["owner"] = self.context.get("user")
        
        return super().create(validated_data)
