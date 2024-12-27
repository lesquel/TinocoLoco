from rest_framework import serializers
from base.system_services import UserService


class EmailValidationCodeSerializer(serializers.Serializer):

    def create(self, validated_data):
        email = self.context.get("email")
        user = UserService.get_user_by_email(email)
        code = user.generate_verification_code()

        UserService.send_verification_code(user)

        return code