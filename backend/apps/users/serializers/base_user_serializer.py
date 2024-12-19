from rest_framework import serializers
from ..models.user import CustomUser
from base.utils import errors
from django.utils.translation import gettext as _

from ..messages import ERROR_MESSAGES


class BaseUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=False,
        error_messages={"unique": ERROR_MESSAGES["USERNAME_ALREADY_EXISTS"]},
    )
    email = serializers.EmailField(
        required=False,
        error_messages={"unique": ERROR_MESSAGES["EMAIL_ALREADY_EXISTS"]},
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
            raise errors.ValidationError(error_message)

        return value

    def validate_username(self, value):
        return self.validate_unique_field(value, "username")

    def validate_email(self, value):
        return self.validate_unique_field(value, "email")
