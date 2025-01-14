from rest_framework import serializers
from base.utils import errors
from base.system_services import UserService
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

    def validate_identity_card(self, identity_card):
        if not identity_card:
            return identity_card

        if not identity_card.isdigit():
            raise errors.IdentityCardCannotContainLettersError()
        if len(identity_card) != 10:
            raise errors.IdentityCardTooLongError()

        request_user = self.context.get("user")
        if (
            CustomUser.objects.filter(identity_card=identity_card)
            .exclude(id=request_user.id)
            .exists()
        ):
            raise errors.IdentityCardAlreadyExistsError()

        return identity_card

    def validate_role(self, value):
        if value not in RoleChoices.values:
            raise errors.InvalidRoleError()
        return value
    
    def validate_first_name(self, first_name):
        if len(first_name) > 30:
            raise errors.FirstNameTooLongError()
        if any(char.isdigit() for char in first_name):
            raise errors.FirstNameCannotContainNumbersError()
        return first_name

    def validate_last_name(self, last_name):
        if len(last_name) > 30:
            raise errors.LastNameTooLongError()
        if any(char.isdigit() for char in last_name):
            raise errors.LastNameCannotContainNumbersError()
        return last_name

    def update(self, instance, validated_data):
        request_user = self.context.get("user")
        new_role = validated_data.get("role", None)

        if new_role:
            if not request_user.is_superuser:
                raise errors.InvalidPermissionsError()
            try:
                instance.role = (
                    new_role
                    if new_role in RoleChoices.values
                    else RoleChoices.COSTUMER.value
                )
                instance.is_superuser = new_role == RoleChoices.ADMIN.value
                instance.is_staff = new_role == RoleChoices.ADMIN.value
            except KeyError:
                raise errors.InvalidRoleError()

        password = validated_data.pop("password", None)
        if password:
            UserService.change_user_password(instance, password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
