from django.utils import translation
from rest_framework import serializers
from .models import CustomUser
from django.utils.translation import gettext as _

ERROR_MESSAGES = {
    "MUST_PROVIDE_USERNAME": _("Por favor, ingresar su nombre de usuario."),
    "MUST_PROVIDE_EMAIL": _("Por favor, ingresar su correo electrónico."),
    "MUST_PROVIDE_PASSWORD": _("Por favor, ingresar su contraseña."),
    "USERNAME_ALREADY_EXISTS": _("Este nombre de usuario ya está en uso."),
    "IDENTITY_CARD_ALREADY_EXISTS": _("Este número de cédula ya está registrado."),
    "EMAIL_ALREADY_EXISTS": _("Este correo electrónico ya está registrado."),
    "INVALID_ROLE": _("Rol inválido"),
    "INVALID_SEX": _("Sexo inválido"),
}

class CustomUserSerializer(serializers.ModelSerializer):
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
    password = serializers.CharField(
        write_only=True,
        error_messages={"required": ERROR_MESSAGES["MUST_PROVIDE_PASSWORD"]},
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

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = CustomUser(**validated_data)
        self.handle_password(user, password)
        user.save()
        return user

    def update(self, instance, validated_data):
        role = validated_data.get("role")  

        if role is not None:
            try:
                instance.role = (
                    CustomUser.ROLE_CHOICES[role] if isinstance(role, str) else role
                )
            except KeyError:
                raise serializers.ValidationError(ERROR_MESSAGES["INVALID_ROLE"])

        password = validated_data.pop("password", None)
        self.handle_password(instance, password)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Save the instance
        instance.save()
        return instance

    def validate_identity_card(self, value):
        if not value:
            return value
        return self.validate_unique_field(value, "identity_card")

    def validate_username(self, value):
        return self.validate_unique_field(value, "username")

    def validate_email(self, value):
        return self.validate_unique_field(value, "email")

    def validate_role(self, value):
        """Validates if the role is valid"""
        valid_roles = dict(CustomUser.ROLE_CHOICES).keys()
        if value not in valid_roles:
            raise serializers.ValidationError(ERROR_MESSAGES["INVALID_ROLE"])
        return value

    def validate_unique_field(self, value, field_name):
        """Generalized validation for unique fields."""
        query = CustomUser.objects.filter(**{field_name: value})

        if self.instance:
            query = query.exclude(pk=self.instance.pk)

        if query.exists():
            error_message = ERROR_MESSAGES[f"{field_name.upper()}_ALREADY_EXISTS"]
            raise serializers.ValidationError(error_message)

        return value

    def validate(self, data):
        # Aquí activamos el idioma del usuario, si está autenticado
        user = self.context.get('request').user if self.context.get('request') else None
        
        if user and user.is_authenticated and user.preferred_language:
            # Cambiar idioma según el idioma preferido del usuario
            translation.activate(user.preferred_language)
        
        # Llamamos a la validación original
        return super().validate(data)
