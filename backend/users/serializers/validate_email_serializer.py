from rest_framework import serializers
from users.models import CustomUser
from datetime import timedelta
from django.utils.timezone import now


class ValidateEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    verification_code = serializers.CharField(max_length=6)

    def validate(self, data):

        email = data.get("email")
        verification_code = data.get("verification_code")

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError(
                "El correo electrónico no está registrado."
            )

        if user.email_verification_code != verification_code:
            raise serializers.ValidationError(
                "El código de verificación es incorrecto."
            )

        expiration_time = user.date_joined + timedelta(hours=24)
        if now() > expiration_time:
            user.generate_verification_code()
            raise serializers.ValidationError("El código de verificación ha expirado. Se ha enviado un nuevo código a su correo electrónico.")

        user.email_verified = True
        user.save()

        return data

    def create(self, validated_data):
        
        return validated_data