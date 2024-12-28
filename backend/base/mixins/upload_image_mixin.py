from rest_framework import status
from rest_framework.decorators import action

from rest_framework.response import Response
from base.utils import errors
from apps.photos.serializers import CreatePhotoSerializer, RetrievePhotoSerializer

class UploadImagesViewMixin:

    @action(detail=True, methods=["post"], url_path="upload-images")
    def upload_images(self, request, pk=None):
        related_instance = self.get_object()
        images = request.FILES.getlist("images")

        if not images:
            raise errors.MustProvidePhotoError()

        serializer = CreatePhotoSerializer(
            data=[{"image": img} for img in images],
            context={"related_instance": related_instance},
        )
        serializer.is_valid(raise_exception=True)

        photos = serializer.save()

        return Response(
            RetrievePhotoSerializer(instance=photos, many=True).data,
            status=status.HTTP_201_CREATED,
        )
