from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers
from django.utils.translation import gettext as _

from ..messages import ERROR_MESSAGES
from ..models import Photo


class CreatePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["image"]

    image = serializers.ListField(
        child=serializers.ImageField(),
        error_messages={"required": ERROR_MESSAGES["MUST_PROVIDE_IMAGE"]},
    )

    def create(self, validated_data):
        images = validated_data.get("images")
        related_instance = self.context.get("related_instance")

        if not related_instance:
            raise serializers.ValidationError(
                {"error": _("El modelo relacionado no fue proporcionado.")}
            )

        content_type = ContentType.objects.get_for_model(related_instance)
        photos = []

        for image in images:
            photo = Photo.objects.create(
                content_type=content_type,
                object_id=related_instance.id,
                content_object=related_instance,
                image=image,
            )
            photos.append(photo)

        return photos
