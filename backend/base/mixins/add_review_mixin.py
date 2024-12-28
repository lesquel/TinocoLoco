from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from apps.reviews.serializers import CreateReviewSerializer, RetrieveReviewSerializer


class AddReviewMixin:
    @action(
        detail=True,
        methods=["post"],
        url_path="add-review",
        permission_classes=[IsAuthenticated],
    )
    def add_review(self, request, pk=None):
        related_instance = self.get_object()
        user = request.user
        rating_score = request.data.get("rating_score")
        rating_comment = request.data.get("rating_comment")
        serializer = CreateReviewSerializer(
            data={
                "rating_score": rating_score,
                "rating_comment": rating_comment,
            },
            context={"owner": user, "related_instance": related_instance},
        )
        serializer.is_valid(raise_exception=True)
        review = serializer.save()
        return Response(
            RetrieveReviewSerializer(review).data,
            status=status.HTTP_201_CREATED,)
