from rest_framework import serializers
from base.utils import ImageUtils


from service.models import ServiceCategory


class ServiceCategorySerializer(serializers.ModelSerializer):
    service_category_image_url = serializers.SerializerMethodField()
    class Meta:
        model = ServiceCategory
        fields = "__all__"
        
    def get_service_category_image_url(self, obj):
        return ImageUtils.get_image_url(obj.service_category_image)