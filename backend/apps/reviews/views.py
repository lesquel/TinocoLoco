from rest_framework import viewsets, status
from apps.users.permissions import IsAdminOrOwner
from rest_framework.response import Response
from base.system_services import ReviewService
from .messages import SUCCESS_MESSAGES
from .serializers import RetrieveReviewSerializer


class ReviewView(viewsets.ModelViewSet):
    serializer_class = RetrieveReviewSerializer
    http_method_names = ["get", "delete"]
    permission_classes = [IsAdminOrOwner]
    queryset = ReviewService.get_all()

    def delete(self, request, pk=None):
        review = ReviewService.get_by_id(pk)

        ReviewService.delete(review.id)

        return Response(
            {"detail": SUCCESS_MESSAGES["REVIEW_DELETED_SUCCESSFULLY"]},
            status=status.HTTP_204_NO_CONTENT,
        )
