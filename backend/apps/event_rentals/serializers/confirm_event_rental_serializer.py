from rest_framework import serializers
from base.system_services import EventRentalService
from base.utils import errors
from ..choices import EventRentalStatus


class ConfirmEventRentalSerializer(serializers.Serializer):
    confirmation_code = serializers.CharField()

    def validate(self, attrs):
        confirmation_code = attrs.get("confirmation_code")
        
        event_rental = EventRentalService.get_by_confirmation_code(confirmation_code)

        if event_rental.current_status.status == EventRentalStatus.CONFIRMED.value:
            raise errors.AlreadyConfirmedError()
        attrs["event_rental"] = event_rental
        return attrs


    def update(self, instance, validated_data):
        
        user = self.context.get("user")
        event_rental = validated_data.get("event_rental")
        instance = event_rental
        EventRentalService.change_status(
            instance, EventRentalStatus.CONFIRMED.value, user
        )
        return instance