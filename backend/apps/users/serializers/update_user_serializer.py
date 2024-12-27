from rest_framework import serializers
from base.utils import errors
from ..models.user import CustomUser
from ..choices import RoleChoices
from .base_user_serializer import BaseUserSerializer


class UpdateUserSerializer(BaseUserSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta(BaseUserSerializer.Meta):

        fields = [
            "identity_card",
            "username",
            "first_name",
            "last_name",
            "nationality",
            "password",
            "sex",
            "preferred_language",
        ]

    def update(self, instance, validated_data):
        request_user = self.context["request"].user
        new_role = validated_data.get("role", None)

        if new_role:
            if not request_user.is_superuser:
                raise errors.InvalidPermissionsError()
            try:
                instance.role = (
                    new_role if new_role in RoleChoices.values else RoleChoices.COSTUMER.value
                )
                instance.is_superuser = new_role == RoleChoices.ADMIN.value
                instance.is_staff = new_role == RoleChoices.ADMIN.value
            except KeyError:
                raise errors.InvalidRoleError()

        password = validated_data.pop("password", None)
        if password:
            self.handle_password(instance, password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

    def validate_identity_card(self, value):
        if not value:
            return value
        request_user = self.context["request"].user
        if CustomUser.objects.filter(identity_card=value).exclude(id=request_user.id).exists():
            raise errors.IdentityCardAlreadyExistsError()
        return value


    def validate_role(self, value):
        if value not in RoleChoices.values:
            raise errors.InvalidRoleError()
        return value
