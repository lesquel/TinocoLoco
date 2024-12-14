from rest_framework import serializers
from base.utils import ImageUtils


from ..models import EventCategory


class CreateEventCategorySerializer(serializers.ModelSerializer):
    event_category_image = serializers.ImageField()

    class Meta:
        model = EventCategory
        fields = [
            "event_category_name",
            "event_category_image",
            "event_category_description",
        ]


class RetrieveEventCategorySerializer(serializers.ModelSerializer):
    event_category_image_url = serializers.SerializerMethodField()

    class Meta:
        model = EventCategory
        fields = [field.name for field in model._meta.fields] + ['event_category_image_url']

        read_only_fields = fields

    def get_event_category_image_url(self, obj):
        return ImageUtils.get_image_url(obj.event_category_image)
