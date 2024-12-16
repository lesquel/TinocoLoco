from rest_framework import serializers

from base.utils import ImageUtils

from .models import BusinessConfiguration


class UpdateBusinessConfigurationSerializer(serializers.ModelSerializer):
    business_logo = serializers.ImageField()
    class Meta:
        model = BusinessConfiguration
        fields =  "__all__"



class RetrieveBusinessConfigurationSerializer(serializers.ModelSerializer):
    business_logo_url = serializers.SerializerMethodField()

    class Meta:
        model = BusinessConfiguration
        fields = [field.name for field in model._meta.fields] + ["business_logo_url"]

    def get_business_logo_url(self, obj):
        return ImageUtils.get_image_url(obj.business_logo) 
