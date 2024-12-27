from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from django.db.utils import IntegrityError
from base.utils import errors
from ..models import Review
from ..messages import ERROR_MESSAGES


class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["rating_score", "rating_comment"]

    def validate_rating_score(self, value):
        if value < 0 or value > 5:
            raise errors.RatingMustBeBetween1And5()
        return value

    def create(self, validated_data):
        owner = self.context.get("owner")
        related_instance = self.context.get("related_instance")
        
        object_id = related_instance.id
        rating_score = validated_data.get("rating_score")
        rating_comment = validated_data.get("rating_comment")

        if not related_instance:
            raise errors.ValidationError(
                ERROR_MESSAGES["RELATED_INSTANCE_DOES_NOT_EXIST"], "related_instance"
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
            raise errors.ReviewAlreadyExits()
