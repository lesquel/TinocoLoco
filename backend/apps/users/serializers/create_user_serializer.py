from rest_framework import serializers
from base.system_services import UserService

from ..messages import ERROR_MESSAGES
from ..models.user import CustomUser
from .base_user_serializer import BaseUserSerializer



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
        user.generate_verification_code()
        UserService.send_verification_code(user)

        return {"user": user, "token": token}
