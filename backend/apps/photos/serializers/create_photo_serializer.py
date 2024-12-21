from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from base.utils import errors
from ..messages import ERROR_MESSAGES
from ..models import Photo

class PhotoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["image"]

    def validate(self, attrs):

        image = attrs.get("image")
        if not image:
            raise errors.MustProvideImageError()
        return attrs

    def create(self, validated_data):
        image = validated_data.get("image")
        related_instance = self.context.get("related_instance")

        if not related_instance:
            raise errors.NotFoundError(ERROR_MESSAGES["RELATED_INSTANCE_NOT_FOUND"])

        content_type = ContentType.objects.get_for_model(related_instance)

        photo = Photo.objects.create(
            content_type=content_type,
            object_id=related_instance.id,
            content_object=related_instance,
            image=image,
        )

        return photo


class CreatePhotoSerializer(serializers.ListSerializer):
    child = PhotoItemSerializer()

    def create(self, validated_data):

        photos = []
        for item in validated_data:
        
            photo = self.child.create(item) 
            photos.append(photo)

        return photos
