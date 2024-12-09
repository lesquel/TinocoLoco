from django.utils.translation import gettext as _
from rest_framework import serializers
from user.models import CustomUser
from .base_user_serializer import BaseUserSerializer


ERROR_MESSAGES = {
    "MUST_PROVIDE_USERNAME": _("Por favor, ingresar su nombre de usuario."),
    "MUST_PROVIDE_EMAIL": _("Por favor, ingresar su correo electronico."),
    "MUST_PROVIDE_PASSWORD": _("Por favor, ingresar su contrasena."),
}


class CreateUserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ["username", "email", "password"]

    username = serializers.CharField(
        required=True,
        error_messages={"required": ERROR_MESSAGES["MUST_PROVIDE_USERNAME"]},
    )
    email = serializers.EmailField(
        required=True,
        error_messages={"required": ERROR_MESSAGES["MUST_PROVIDE_EMAIL"]},
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={"required": ERROR_MESSAGES["MUST_PROVIDE_PASSWORD"]},
    )

    def create(self, validated_data):
        username = validated_data.get("username")
        email = validated_data.get("email")
        password = validated_data.get("password", None)
        user = CustomUser.objects.create_user(username, email)
        self.handle_password(user, password)
        return user
