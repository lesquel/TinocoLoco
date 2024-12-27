from rest_framework import serializers
from django.utils.timezone import now
from datetime import timedelta
from base.utils import errors

from base.system_services import UserService


class ValidateEmailSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)

    def validate(self, data):

        email = self.context.get("email")
        code = data.get("code")

        user = UserService.get_by_email(email)

        if user.email_verification_code != code:
            raise errors.InvalidCodeError()

        user.email_verified = True
        user.save()

        return data

    def create(self, validated_data):

        return validated_data
