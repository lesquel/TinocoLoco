from rest_framework import serializers
from .models import CustomUser, INVALID_ROLE_ERROR

from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "identity_card",
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "sex",
            "role",
        ]
        extra_kwargs = {
            "password": {"write_only": True},  #
            "first_name": {"required": False},  
            "last_name": {"required": False},   
        }

    def create(self, validated_data):
        
        password = validated_data.pop("password", None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


    def validate_identity_card(self, value):
        if CustomUser.objects.filter(identity_card=value).exists():
            raise serializers.ValidationError(
                {"identity_card": "Este número de cédula ya está registrado."}
            )
        return value

    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                {"username": "Este nombre de usuario ya está en uso."}
            )
        return value

    
    def validate_role(self, value):
        valid_roles = dict(CustomUser.ROLE_CHOICES).keys()
        if value not in valid_roles:
            raise serializers.ValidationError(INVALID_ROLE_ERROR)
        return value