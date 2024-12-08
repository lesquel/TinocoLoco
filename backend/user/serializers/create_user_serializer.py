from django.utils.translation import gettext as _
from rest_framework import serializers
from user.models import CustomUser
from .base_user_serializer import BaseUserSerializer


ERROR_MESSAGES = {
    "MUST_PROVIDE_PASSWORD": _("Por favor, ingresar su contraseña."),
}


class CreateUserSerializer(BaseUserSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={"required": ERROR_MESSAGES["MUST_PROVIDE_PASSWORD"]},
    )

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = CustomUser(**validated_data)
        self.handle_password(user, password)
        user.save()
        return user
