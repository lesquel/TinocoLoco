from rest_framework import serializers
from base.utils import ImageUtils

from apps.reviews.models import Review
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
            "view_count",
        ]


class RetrievePromotionSerializer(serializers.ModelSerializer):
    promotion_image_url = serializers.SerializerMethodField()
    avg_rating = serializers.SerializerMethodField()
    class Meta:
        model = Promotion
        fields = "__all__"
        

    def get_promotion_image_url(self, obj):
        return ImageUtils.get_image_url(obj.promotion_image)
    
    def get_avg_rating(self, obj):
        return Review.avg_rating_for_object(obj)
