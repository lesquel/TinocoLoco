from django.utils.translation import gettext as _
from rest_framework import serializers
from user.choices import RoleChoices
from base.utils import errors
from .base_user_serializer import BaseUserSerializer


ERROR_MESSAGES = {
    "USERNAME_ALREADY_EXISTS": _("Este nombre de usuario ya está en uso."),
    "IDENTITY_CARD_ALREADY_EXISTS": _("Este número de cédula ya está registrado."),
    "EMAIL_ALREADY_EXISTS": _("Este correo electrónico ya está registrado."),
    "INVALID_SEX": _("Sexo inválido"),
}


class UpdateUserSerializer(BaseUserSerializer):
    password = serializers.CharField(write_only=True, required=False)

    def update(self, instance, validated_data):
        request_user = self.context["request"].user
        new_role = validated_data.get("role", None)

        if new_role:
            if not request_user.is_superuser:
                raise errors.InvalidPermissionsError()
            try:
                instance.role = new_role if new_role in RoleChoices.values else RoleChoices.COSTUMER
                instance.is_superuser = new_role == RoleChoices.ADMIN
                instance.is_staff = new_role == RoleChoices.ADMIN
            except KeyError:
                raise errors.InvalidRoleError()

        password = validated_data.pop("password", None)
        if password:
            self.handle_password(instance, password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

    def validate_identity_card(self, value):
        if not value:
            return value
        return self.validate_unique_field(value, "identity_card")

    
    def validate_role(self, value):
        if value not in RoleChoices.values:
            raise errors.InvalidRoleError()
        return value
