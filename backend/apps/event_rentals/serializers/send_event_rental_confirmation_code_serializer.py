from rest_framework import serializers
from base.system_services import EventRentalService
from ..choices import EventRentalStatus
from base.utils import errors


class SendEventRentalConfirmationCodeSerializer(serializers.Serializer):

    def validate(self, data):
        event_rental = self.context.get("event_rental")

        if event_rental.current_status.status == EventRentalStatus.CONFIRMED.value:
            raise errors.AlreadyConfirmedError()
        return data

    def create(self, validated_data):
        event_rental = self.context.get("event_rental")
        code = event_rental.generate_confirmation_code()

        EventRentalService.send_confirmation_mail(event_rental)
        return event_rental
