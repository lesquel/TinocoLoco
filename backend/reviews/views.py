from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly, IsAdminOrOwner
from .models import Review
from .serializers import ReviewSerializer

# Create your views here.


class ReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly, IsAdminOrOwner]
    queryset = Review.objects.all()
