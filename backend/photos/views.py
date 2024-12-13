from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action
from rest_framework import viewsets

from django.utils.translation import gettext as _

from base.system_services import PhotoService
from base.utils import ImageUtils

from .serializers import CreatePhotoSerializer,RetrievePhotoSerializer

IMAGE_DELETE_SUCCESS = _("Foto eliminada correctamente.")


class PhotoView(viewsets.ModelViewSet):
    queryset = PhotoService.get_all()
    permission_classes = [IsAdminUser]
    http_method_names = ['get','delete']
    
    def get_serializer_class(self):
        if self.action == 'retrieve' or self.action == 'list':
            return RetrievePhotoSerializer
        return CreatePhotoSerializer

    def delete(self, request, pk=None):
        photo = PhotoService.get_by_id(pk)

        serializer = CreatePhotoSerializer(photo)
        if not serializer.is_valid():
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )

        ImageUtils.delete_image(photo.image)
        PhotoService.delete(photo.id)

        return Response(
            {"message": IMAGE_DELETE_SUCCESS},
            status=status.HTTP_204_NO_CONTENT,
        )
