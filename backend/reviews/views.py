from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly, IsAdminOrOwner
from base.system_services import ReviewService
from .serializers import ReviewSerializer
from .filters import ReviewFilter


# Create your views here.
class ReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly, IsAdminOrOwner]
    queryset = ReviewService.get_all()
    filterset_class = ReviewFilter
