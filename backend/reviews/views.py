from rest_framework import viewsets, status
from users.permissions import IsAdminOrReadOnly, IsAdminOrOwner
from rest_framework.response import Response
from django.utils.translation import gettext as _
from base.system_services import ReviewService
from .serializers import CreateReviewSerializer
from .messages import SUCCESS_MESSAGES
class ReviewView(viewsets.ModelViewSet):
    serializer_class = CreateReviewSerializer
    http_method_names = ["delete"]
    permission_classes = [IsAdminOrReadOnly, IsAdminOrOwner]
    queryset = ReviewService.get_all()
    

    def delete(self, request, pk=None):
        review = ReviewService.get_by_id(pk)

        serializer = self.get_serializer(review)
        if not serializer.is_valid():
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )

        ReviewService.delete(review.id)

        return Response(
            {"message": SUCCESS_MESSAGES["REVIEW_DELETED_SUCCESSFULLY"]},
            status=status.HTTP_204_NO_CONTENT,
        )
