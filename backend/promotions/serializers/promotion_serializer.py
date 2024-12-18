from rest_framework import serializers
from base.utils import ImageUtils
from ..models import Promotion


class CreatePromotionSerializer(serializers.ModelSerializer):
    promotion_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Promotion
        fields = [
            "promotion_name",
            "promotion_description",
            "promotion_category",
            "promotion_discount_percentage",
            "valid_from",
            "valid_until",
            "promotion_image",
        ]
        read_only_fields = [
            "id",
            "creation_date",
            "last_actualization_date",
            "visualizations",
        ]


class RetrievePromotionSerializer(serializers.ModelSerializer):
    promotion_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Promotion
        fields = [field.name for field in model._meta.fields] + ["promotion_image_url"]

    def get_promotion_image_url(self, obj):
        return ImageUtils.get_image_url(obj.promotion_image)
