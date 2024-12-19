from rest_framework import serializers
from base.utils import ImageUtils
from ..models import Photo


class RetrievePhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Photo
        fields = [field.name for field in model._meta.fields] + ['image_url']

        read_only_fields = fields

    def get_image_url(self, obj):
        return ImageUtils.get_image_url(obj.image)
