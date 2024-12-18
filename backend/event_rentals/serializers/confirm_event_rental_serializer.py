from rest_framework import serializers
from base.system_services import EventRentalService
from ..choices import EventRentalStatus


class ConfirmEventRentalStatusSerializer(serializers.Serializer):
    confirmation_code = serializers.CharField()

    def validate(self, attrs):
        confirmation_code = attrs.get("confirmation_code")
        
        event_rental = EventRentalService.get_by_confirmation_code(confirmation_code)
        
        attrs["event_rental"] = event_rental
        return attrs

    def update(self, instance, validated_data):
        user = self.context.get("request").user
        event_rental = validated_data.get("event_rental")
        EventRentalService.change_status(
            instance, EventRentalStatus.CONFIRMED.value, user
        )
        return instance
