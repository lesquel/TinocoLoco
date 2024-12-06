from rest_framework import serializers
from .models import BusinessConfiguration


class BusinessConfigurationSerializer(serializers.ModelSerializer):
    # Con serializerMethodField se puede modificar la logica de como un campo se serializa
    business_logo_url = serializers.SerializerMethodField()

    class Meta:
        model = BusinessConfiguration
        fields = "__all__"



    def get_business_logo_url(self, obj):
        return obj.get_logo_url() if obj.business_logo else None
