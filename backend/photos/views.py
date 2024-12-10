from rest_framework import viewsets
from users.permissions import IsAdminOrReadOnly, IsAdminOrOwner
from .models import Photo
from .serializers import PhotoSerializer


class PhotoView(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly, IsAdminOrOwner]
    queryset = Photo.objects.all()