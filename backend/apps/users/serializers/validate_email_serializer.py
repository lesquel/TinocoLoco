from rest_framework import serializers
from django.utils.timezone import now
from datetime import timedelta
from base.utils import errors

from ..models import CustomUser


class ValidateEmailSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)

    def validate(self, data):

        email = self.context["request"].user.email
        code = data.get("code")

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise errors.EmailDoesNotExistError()

        if user.email_verification_code != code:
            raise errors.InvalidCodeError()

        user.email_verified = True
        user.save()

        return data

    def create(self, validated_data):

        return validated_data
