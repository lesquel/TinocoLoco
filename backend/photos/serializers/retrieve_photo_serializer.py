from rest_framework import serializers
from base.utils import ImageUtils
from ..models import Photo


class RetrievePhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Photo
        fields = ["id", "image", "image_url", "content_type","content_type_name", "object_id"]
        read_only_fields = fields

    def get_image_url(self, obj):
        return ImageUtils.get_image_url(obj.image)
