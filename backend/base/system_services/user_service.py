from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token

from ..interfaces.Iservice import IService


from base.utils import errors
from users.models import CustomUser


class UserService(IService):
    model = CustomUser

    @classmethod
    def login_user(cls, username, password):
        user = authenticate(username=username, password=password)
        if not user:
            raise errors.InvalidCredentialsError()
        token = cls.get_token(user)
        return token, user

    @classmethod
    def logout_user(cls, user):
        cls.validate_token(user).delete()

    @classmethod
    def delete_user(cls, user):
        user.delete()

    @classmethod
    def validate_token(cls, user):
        try:
            return Token.objects.filter(user=user).first()

        except Token.DoesNotExist:
            raise errors.InvalidCredentialsError()

    @classmethod
    def get_token(cls, user):
        try:
            return Token.objects.get_or_create(user=user)[0]
        except Token.DoesNotExist:
            raise errors.InvalidCredentialsError()

    @classmethod
    def change_user_language(cls, user, language):
        user.preferred_language = language
        user.save()
