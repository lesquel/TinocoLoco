from rest_framework import serializers
from base.utils import errors
from base.system_services import UserService
from django.utils.translation import gettext as _


ERROR_MESSAGES = {
    "MUST_PROVIDE_USERNAME": _("Por favor, ingresar su nombre de usuario."),
    "MUST_PROVIDE_EMAIL": _("Por favor, ingresar su correo electronico."),
    "MUST_PROVIDE_PASSWORD": _("Por favor, ingresar su contrasena."),
}


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField(
        required=True,
        write_only=True,
        error_messages={"required": ERROR_MESSAGES["MUST_PROVIDE_USERNAME"]},
    )
    password = serializers.CharField(
        required=True,
        write_only=True,
        error_messages={"required": ERROR_MESSAGES["MUST_PROVIDE_PASSWORD"]},
    )

    def validate(self, data):

        username = data.pop("username")
        password = data.pop("password")
        if not username or not password:
            raise errors.MissingFieldsLoginError()
        
        token, user = UserService.login_user(username, password)

        data["token"] = token
        data["user"] = user

        return data
