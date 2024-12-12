from rest_framework import serializers
from django.utils.translation import gettext as _
from ..models import Photo

ERROR_MESSAGES = {
    "MUST_PROVIDE_IMAGE": _("Por favor, subir una imagen."),
}

class CreatePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["id", "image", "object_id"]


    image = serializers.ImageField(
        required=True,
        error_messages={"required": ERROR_MESSAGES["MUST_PROVIDE_IMAGE"]},
    )

    def create(self, validated_data):
        image = validated_data.get("image")
        object_id = validated_data.get("object_id")
        related_instance = self.context.get("related_instance")
        print(related_instance)
        if not related_instance:
            raise serializers.ValidationError(
                {"error": _("El modelo relacionado no fue proporcionado.")}
            )

        photo = Photo.objects.create(
            image=image,
            object_id=object_id,
            content_object=related_instance,  
        )
        return photo

    def update(self, instance, validated_data):
        instance.image = validated_data.get("image", instance.image)
        instance.save()
        return instance