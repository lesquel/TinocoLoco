from rest_framework import serializers, status
from rest_framework.response import Response
from base.system_services import UserService
from ..messages import SUCCESS_MESSAGES
from ..models import PasswordResetCode


class PasswordResetRequestSerializer(serializers.Serializer):

    def create(self, validated_data):
        email = self.context["request"].user.email
        user = UserService.get_user_by_email(email)

        reset_code = PasswordResetCode.generate_reset_code(user)

        UserService.send_reset_password_code(user, reset_code.code)
        
        return reset_code

        
