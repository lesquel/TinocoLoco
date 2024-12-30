from rest_framework import serializers
from base.system_services import UserService
from base.utils import errors
from ..models import PasswordResetCode


class PasswordResetRequestSerializer(serializers.Serializer):

    email = serializers.EmailField()

    def validate_email(self, email):
        if not UserService.get_by_email(email):
            raise errors.EmailDoesNotExistError()
        return email

    def create(self, validated_data):
        email = validated_data.get("email")
        print(email)
        user = UserService.get_by_email(email)

        reset_code = PasswordResetCode.generate_reset_code(user)

        UserService.send_reset_password_code(user, reset_code.code)

        return reset_code
