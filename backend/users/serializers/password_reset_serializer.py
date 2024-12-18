from rest_framework import serializers
from base.system_services import UserService
from ..models import CustomUser, PasswordResetCode

from base.system_services import UserService


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        user = UserService.get_user_by_email(value)
        return value

    def create(self, validated_data):
        email = validated_data["email"]
        user = CustomUser.objects.get(email=email)

        reset_code = PasswordResetCode.generate_reset_code(user)
        UserService.send_reset_password_code(user, reset_code)

        return {"message": "El código ha sido enviado al correo electrónico."}
