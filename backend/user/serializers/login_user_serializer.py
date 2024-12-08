from rest_framework import serializers
from base.utils import errors
from base.services import UserService


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        if not username or not password:
            raise errors.MissingFieldsLoginError()

        token, user = UserService.login_user(username, password)
        
        data["token"] = token
        data["user"] = user
        return data
