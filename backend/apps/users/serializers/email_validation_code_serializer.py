from rest_framework import serializers, status
from rest_framework.response import Response
from base.system_services import UserService
from ..models import CustomUser

from base.system_services import UserService
from ..messages import SUCCESS_MESSAGES


class EmailValidationCodeSerializer(serializers.Serializer):

    def create(self, validated_data):
        email = self.context["request"].user.email
        user = UserService.get_user_by_email(email)
        code = user.generate_verification_code()

        UserService.send_verification_code(user)

        return code