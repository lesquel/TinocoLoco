from rest_framework import serializers
from base.system_services import UserService
from ..models import CustomUser, PasswordResetCode

from base.system_services import UserService


class PasswordResetRequestSerializer(serializers.Serializer):

    def create(self, validated_data):
        email = self.context["request"].user.email
        print(f"Email: {email}")
        user = UserService.get_user_by_email(email)
        print(f"User found: {user}")  # Para verificar que el usuario se obtiene correctamente

        if not user:
            raise serializers.ValidationError("No se encontró un usuario con ese correo electrónico.")

        reset_code = PasswordResetCode.generate_reset_code(user)
        print(f"Generated reset code: {reset_code}")  # Para verificar que el código se genera correctamente
        reset_code.save()
        
        UserService.send_reset_password_code(user, reset_code.code)

        return {"message": "El código ha sido enviado al correo electrónico."}