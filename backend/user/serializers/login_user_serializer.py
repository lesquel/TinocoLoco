from rest_framework import serializers
from base.utils import errors
from base.services import UserService


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        print(data)
        username = data.pop("username")
        password = data.pop("password")
        if not username or not password:
            raise errors.MissingFieldsLoginError()
        print(f"username: {username}")
        print(f"password: {password}")
        token, user = UserService.login_user(username, password)
        print(token)
        print(user)
        
        data["token"] = token
        data["user"] = user
        return data
