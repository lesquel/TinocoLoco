from django.utils.translation import gettext as _
from rest_framework import serializers
from users.models import CustomUser
from .base_user_serializer import BaseUserSerializer
from base.system_services import UserService
from base.utils import errors

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

    def create(self, data):
        username = data.pop("username")
        email = data.pop("email")
        password = data.pop("password")
        user = CustomUser.objects.create_user(username, email, password)
        token = UserService.get_token(user)

        return {"user": user, "token": token}