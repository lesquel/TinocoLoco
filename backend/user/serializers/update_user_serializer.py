from django.utils.translation import gettext as _
from rest_framework import serializers
from user.models import CustomUser
from base.utils import errors
from .base_user_serializer import BaseUserSerializer


class UpdateUserSerializer(BaseUserSerializer):
    password = serializers.CharField(write_only=True, required=False)

    def update(self, instance, validated_data):
        role = validated_data.get("role")

        if role is not None:
            try:
                instance.role = (
                    CustomUser.ROLE_CHOICES[role] if isinstance(role, str) else role
                )
            except KeyError:
                raise errors.InvalidRoleError()

        password = validated_data.pop("password", None)
        self.handle_password(instance, password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
