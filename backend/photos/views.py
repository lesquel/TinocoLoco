from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.contrib.contenttypes.models import ContentType
from rest_framework.parsers import MultiPartParser
from .models import Photo
from .serializers import RetrievePhotoSerializer, CreatePhotoSerializer
from users.permissions import IsAdminOrReadOnly

MODEL_NOT_ALLOWED = "Model not allowed"

class PhotoViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing Photo objects.
    """

    http_method_names = ["get", "post", "put", "delete"]  # Explicit methods
    serializer_class = RetrievePhotoSerializer
    permission_classes = [IsAdminOrReadOnly]
    queryset = Photo.objects.all()
    parser_classes = [MultiPartParser]

    def get_serializer_class(self):
        """
        Dynamically choose the serializer based on the request method.
        """
        if self.request.method in ["GET", "HEAD"]:
            return RetrievePhotoSerializer
        else:
            return CreatePhotoSerializer

    # def create(self, request, *args, **kwargs):
    #     """
    #     Create a new Photo object, associating it with a specific content type and object ID.
    #     """
    #     content_type_id = request.data.get("content_type")
    #     object_id = request.data.get("object_id")

    #     if content_type_id is None or object_id is None:
    #         raise ValidationError({"detail": "content_type and object_id are required fields."})

    #     try:
    #         content_type = ContentType.objects.get_for_id(content_type_id)
    #         if content_type.model_class() is None:
    #             raise ValidationError(MODEL_NOT_ALLOWED)
    #     except ContentType.DoesNotExist:
    #         raise ValidationError({"detail": "Invalid content_type ID provided."})

    #     serializer = self.get_serializer(data=request.data)
    #     photo = serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)

    #     return Response(RetrievePhotoSerializer(instance=photo).data, status=status.HTTP_201_CREATED)