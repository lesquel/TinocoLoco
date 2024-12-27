from rest_framework import serializers, status
from base.system_services import EventRentalService


class SendEventRentalConfirmationCodeSerializer(serializers.Serializer):

    def create(self, validated_data):
        event_rental = self.context.get("event_rental")
        code = event_rental.generate_confirmation_code()

        EventRentalService.send_confirmation_mail(event_rental)
        print("code", code)
        return event_rental
