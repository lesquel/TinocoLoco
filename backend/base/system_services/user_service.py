from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token

from ..abstracts.Aservice import AService

from .email_service import EmailService
from base.utils import errors
from apps.users.models.user import CustomUser


class UserService(AService):
    model = CustomUser

    @classmethod
    def login_user(cls, username, password):
        user = authenticate(username=username, password=password)
        if not user:
            raise errors.InvalidCredentialsError()
        token = cls.get_token(user)
        return token, user

    @classmethod
    def get_by_email(cls, email):
        try:
            return CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise errors.UserNotFoundError()
    @classmethod
    def get_user_by_username(cls, username):
        try:
            return CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            raise errors.UserNotFoundError()

    @classmethod
    def change_user_password(cls, user, password):
        user.set_password(password)
        user.save()
    
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

    
    @classmethod
    def send_verification_code(cls, user):

        EmailService.send_user_verification_code(user)
        
        
    @classmethod
    def send_reset_password_code(cls, user, reset_code):
        EmailService.send_password_reset_code(user, reset_code)
        