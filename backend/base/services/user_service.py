from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token



from base.utils import errors
from users.models import CustomUser


class UserService:
    @staticmethod
    def login_user(username, password):
        user = authenticate(username=username, password=password)
        if not user:
            raise errors.InvalidCredentialsError()
        token = UserService.get_token(user)
        return token, user

    @staticmethod
    def logout_user(user):
        UserService.validate_token(user).delete()

    @staticmethod
    def delete_user(user):
        user.delete()

    @staticmethod
    def get_user_by_id(user_id):
        try:
            return CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            raise errors.UserNotFoundError()

    @staticmethod
    def validate_token(user):
        try:
            return Token.objects.filter(user=user).first()

        except Token.DoesNotExist:
            raise errors.InvalidCredentialsError()

    @staticmethod
    def get_token(user):
        try:
            return Token.objects.get_or_create(user=user)[0]
        except Token.DoesNotExist:
            raise errors.InvalidCredentialsError()

    @staticmethod
    def change_user_language(user, language):
        user.preferred_language = language
        user.save()
