from rest_framework import serializers
from base.utils import ImageUtils


from ..models import EventCategory


class EventCategorySerializer(serializers.ModelSerializer):
    event_category_image_url = serializers.SerializerMethodField()
    class Meta:
        model = EventCategory
        fields = "__all__"
        
    def get_event_category_image_url(self, obj):
        return ImageUtils.get_image_url(obj.event_category_image)