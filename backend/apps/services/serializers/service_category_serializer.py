from rest_framework import serializers
from base.utils import ImageUtils

from ..models import ServiceCategory


class CreateServiceCategorySerializer(serializers.ModelSerializer):
    service_category_image = serializers.ImageField()

    class Meta:
        model = ServiceCategory
        fields = [
            "service_category_name",
            "service_category_image",
            "service_category_description",
        ]



class RetrieveServiceCategorySerializer(serializers.ModelSerializer):
    service_category_image_url = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = [field.name for field in model._meta.fields] + ['service_category_image_url']
        read_only_fields = fields

    def get_service_category_image_url(self, obj):
        return ImageUtils.get_image_url(obj.service_category_image)

