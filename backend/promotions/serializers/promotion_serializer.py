from rest_framework import serializers
from base.utils import ImageUtils
from ..models import Promotion


class CreatePromotionSerializer(serializers.ModelSerializer):
    promotion_image = serializers.ImageField()

    class Meta:
        model = Promotion
        fields = [
            "promotion_name",
            "promotion_image",
            "promotion_description",
        ]


class RetrievePromotionSerializer(serializers.ModelSerializer):
    promotion_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Promotion
        fields = [field.name for field in model._meta.fields] + ['promotion_image_url']


    def get_promotion_image_url(self, obj):
        return ImageUtils.get_image_url(obj.promotion_image)
