from django.contrib.auth.forms import SetPasswordForm
from rest_framework import serializers
from ..models import PasswordResetCode

class PasswordResetConfirmSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=10)
    new_password = serializers.CharField(write_only=True)

    def validate_code(self, value):
        try:
            reset_code = PasswordResetCode.objects.get(code=value)
        except PasswordResetCode.DoesNotExist:
            raise serializers.ValidationError("Código no válido.")

        if reset_code.is_expired():
            raise serializers.ValidationError("El código ha expirado.")
        
        if reset_code.is_used:
            raise serializers.ValidationError("El código ya ha sido utilizado.")
        
        return value

    def save(self):
        code = self.validated_data['code']
        new_password = self.validated_data['new_password']

        reset_code = PasswordResetCode.objects.get(code=code)
        user = reset_code.user

        form = SetPasswordForm(user=user, data={'new_password': new_password})
        if form.is_valid():
            form.save()


            reset_code.is_used = True
            reset_code.save()

        return {"message": "Contraseña restablecida con éxito."}
