from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext as _
from django.db.utils import IntegrityError
from event_rentals.models import EventRental
from ..models import Review


class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["author","rating_score", "rating_comment"]

    def validate_rating_score(self, value):
        if value < 0 or value > 5:
            raise serializers.ValidationError(
                _("La calificación debe estar entre 0 y 5.")
            )
        return value

    def validate_owner_rating(self, value):
        if EventRental.objects.filter(owner_rating=value).exists():
            raise serializers.ValidationError(
                _("Esta calificación ya está asociada a otro alquiler.")
            )
        return value

    def validate_costumer_rating(self, value):
        if EventRental.objects.filter(costumer_rating=value).exists():
            raise serializers.ValidationError(
                _("Esta calificación ya está asociada a otro alquiler.")
            )
        return value

    def create(self, validated_data):
        print(validated_data)
        author = validated_data.get("author")
        related_instance = self.context.get("related_instance")
        object_id = related_instance.id
        rating_score = validated_data.get("rating_score")
        rating_comment = validated_data.get("rating_comment")

        if not related_instance:
            raise serializers.ValidationError(
                {"error": _("El modelo relacionado no fue proporcionado.")}
            )
            
        print(author)
        print(related_instance)
        print(object_id)
        print(rating_score)
        print(rating_comment)
        
    

        content_type = ContentType.objects.get_for_model(related_instance)
        try:
            review = Review.objects.create(
                author=author,
                content_type=content_type,
                object_id=object_id,
                content_object=related_instance,
                rating_score=rating_score,
                rating_comment=rating_comment,
            )
            print(review)
            return review
        except IntegrityError:
            raise serializers.ValidationError(
                {
                    "detail": _(
                        "Ya existe una reseña para este autor y objeto relacionado."
                    )
                }
            )
