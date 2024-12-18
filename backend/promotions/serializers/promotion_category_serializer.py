from rest_framework import serializers


from ..models import PromotionCategory


class PromotionCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PromotionCategory
        fields = "__all__"
        
        read_only_fields = ['id', "visualizations"]
