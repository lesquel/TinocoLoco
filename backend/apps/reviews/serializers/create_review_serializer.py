from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext as _
from django.db.utils import IntegrityError
from ..models import Review


class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["rating_score", "rating_comment"]

    def validate_rating_score(self, value):
        if value < 0 or value > 5:
            raise serializers.ValidationError(
                _("La calificación debe estar entre 0 y 5.")
            )
        return value


    def create(self, validated_data):
        print(validated_data)
        owner = self.context.get("owner")
        related_instance = self.context.get("related_instance")
        object_id = related_instance.id
        rating_score = validated_data.get("rating_score")
        rating_comment = validated_data.get("rating_comment")

        if not related_instance:
            raise serializers.ValidationError(
                {"error": _("El modelo relacionado no fue proporcionado.")}
            )
            

        content_type = ContentType.objects.get_for_model(related_instance)
        try:
            review = Review.objects.create(
                owner=owner,
                content_type=content_type,
                object_id=object_id,
                content_object=related_instance,
                rating_score=rating_score,
                rating_comment=rating_comment,
            )
            return review
        except IntegrityError:
            raise serializers.ValidationError(
                {
                    "detail": _(
                        "Ya existe una reseña para este autor y objeto relacionado."
                    )
                }
            )
