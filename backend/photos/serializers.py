from rest_framework import serializers
from base.utils import ImageUtils
from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = "__all__"

    def get_image_url(self, obj):
        return ImageUtils.get_image_url(obj.image)
