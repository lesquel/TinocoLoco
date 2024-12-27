from rest_framework import serializers
from base.utils import errors
from base.system_services import UserService

from ..messages import ERROR_MESSAGES


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
    
    def validate_username(self, username):
        if not UserService.get_user_by_username(username):
            raise errors.UserNotFoundError()
        return username
