from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token

from django.conf import settings


from base.utils import errors
from user.models import CustomUser


class UserService:
    @staticmethod
    def login_user(username, password):
        user = authenticate(username=username, password=password)
        if not user:
            return None, None
        token, _ = Token.objects.get_or_create(user=user)
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
            raise errors.InvalidToken()

    @staticmethod
    def change_user_language(user, language):
        user.preferred_language = language
        user.save()
