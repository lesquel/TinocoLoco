from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers
from django.utils.translation import gettext as _
from ..models import Photo

ERROR_MESSAGES = {
    "MUST_PROVIDE_IMAGE": _("Por favor, subir una imagen."),
}

class CreatePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["id", "image"]


    image = serializers.ImageField(
        required=True,
        error_messages={"required": ERROR_MESSAGES["MUST_PROVIDE_IMAGE"]},
    )

    def create(self, validated_data):
        image = validated_data.get("image")
        related_instance = self.context.get("related_instance")
        object_id = related_instance.id
        
        
        if not related_instance:
            raise serializers.ValidationError(
                {"error": _("El modelo relacionado no fue proporcionado.")}
            )

        content_type = ContentType.objects.get_for_model(related_instance)

        photo = Photo.objects.create(
            content_type=content_type,
            object_id=object_id,
            content_object=related_instance,  
            image=image,
        )
        return photo
