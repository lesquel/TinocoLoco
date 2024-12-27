from rest_framework import serializers
from base.system_services import UserService
from base.utils import errors
from ..models import PasswordResetCode

class PasswordResetConfirmSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=10)
    new_password = serializers.CharField(write_only=True)

    def validate_code(self, value):
        try:
            reset_code = PasswordResetCode.objects.get(code=value)
        except PasswordResetCode.DoesNotExist:
            raise errors.InvalidCodeError()
        if reset_code.is_expired():
            raise errors.CodeExpiredError()
        
        if reset_code.is_used:
            raise errors.CodeUsedError()
        
        return value

    def save(self):
        code = self.validated_data['code']
        new_password = self.validated_data['new_password']

        reset_code = PasswordResetCode.objects.get(code=code)
        user = reset_code.user

        UserService.change_user_password(user, new_password)
        reset_code.is_used = True
        reset_code.save()

        return reset_code
