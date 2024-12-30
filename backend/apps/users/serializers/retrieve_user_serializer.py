from rest_framework import serializers
from base.system_services import EventRentalService
from ..models.user import CustomUser


class RetrieveUserSerializer(serializers.ModelSerializer):
    reservation_count = serializers.SerializerMethodField()

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
            "reservation_count",
        ]
        read_only_fields = fields

    def get_reservation_count(self, obj):
        return EventRentalService.get_reservation_count("owner", obj)