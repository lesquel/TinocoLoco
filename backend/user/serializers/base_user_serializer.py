from rest_framework import serializers
from user.models import CustomUser
from base.utils import errors
from django.utils.translation import gettext as _

ERROR_MESSAGES = {
    "MUST_PROVIDE_USERNAME": _("Por favor, ingresar su nombre de usuario."),
    "MUST_PROVIDE_EMAIL": _("Por favor, ingresar su correo electrónico."),
    "MUST_PROVIDE_PASSWORD": _("Por favor, ingresar su contraseña."),
    "USERNAME_ALREADY_EXISTS": _("Este nombre de usuario ya está en uso."),
    "IDENTITY_CARD_ALREADY_EXISTS": _("Este número de cédula ya está registrado."),
    "EMAIL_ALREADY_EXISTS": _("Este correo electrónico ya está registrado."),
    "INVALID_SEX": _("Sexo inválido"),
}

class BaseUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        error_messages={
            "required": ERROR_MESSAGES["MUST_PROVIDE_USERNAME"],
            "unique": ERROR_MESSAGES["USERNAME_ALREADY_EXISTS"],
        },
    )
    email = serializers.EmailField(
        required=True,
        error_messages={
            "required": ERROR_MESSAGES["MUST_PROVIDE_EMAIL"],
            "unique": ERROR_MESSAGES["EMAIL_ALREADY_EXISTS"],
        },
    )

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "identity_card",
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "sex",
            "role",
        ]

    def handle_password(self, user, password):
        if password:
            user.set_password(password)
        return user

    def validate_unique_field(self, value, field_name):
        query = CustomUser.objects.filter(**{field_name: value})

        if self.instance:
            query = query.exclude(pk=self.instance.pk)

        if query.exists():
            error_message = ERROR_MESSAGES[f"{field_name.upper()}_ALREADY_EXISTS"]
            raise serializers.ValidationError(error_message)

        return value

    def validate_identity_card(self, value):
        if not value:
            return value
        return self.validate_unique_field(value, "identity_card")

    def validate_username(self, value):
        return self.validate_unique_field(value, "username")

    def validate_email(self, value):
        return self.validate_unique_field(value, "email")

    def validate_role(self, value):
        valid_roles = dict(CustomUser.ROLE_CHOICES).keys()
        if value not in valid_roles:
            raise errors.InvalidRoleError()
        return value
