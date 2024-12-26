from rest_framework import serializers
from base.utils import errors

from ..models.user import CustomUser


class BaseUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=False,
    )
    email = serializers.EmailField(
        required=False,
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

    def validate_email(self, email):
        if self.instance and self.instance.email == email:
            return email
        if CustomUser.objects.filter(email=email).exists():
            raise errors.EmailAlreadyExistsError()
        return email

    def validate_username(self, username):
        if self.instance and self.instance.username == username:
            return username
        if CustomUser.objects.filter(username=username).exists():
            raise errors.UsernameAlreadyExistsError()
        return username
