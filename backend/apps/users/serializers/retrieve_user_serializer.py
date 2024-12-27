from rest_framework import serializers
from ..models.user import CustomUser


class RetrieveUserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "identity_card",
            "first_name",
            "last_name",
            "full_name",
            "username",
            "nationality",
            "email",
            "email_verified",
            "preferred_language",
            "date_joined",
            "is_active",
            "sex",
            "role",
            "has_completed_profile",
        ]
        read_only_fields = fields

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}" if obj.first_name else ""
