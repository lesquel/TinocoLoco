from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import viewsets

from django.utils.translation import gettext as _

from base.system_services import PhotoService
from base.utils import ImageUtils

from .serializers import RetrievePhotoSerializer
from .messages import SUCCESS_MESSAGES 

class PhotoView(viewsets.ModelViewSet):
    queryset = PhotoService.get_all()
    serializer_class = RetrievePhotoSerializer
    permission_classes = [IsAdminUser]
    http_method_names = ['delete']
    


    def delete(self, request, pk=None):
        photo = PhotoService.get_by_id(pk)

        serializer = self.get_serializer(photo)
        if not serializer.is_valid():
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )

        ImageUtils.delete_image(photo.image)
        PhotoService.delete(photo.id)

        return Response(
            {"message": SUCCESS_MESSAGES["PHOTO_DELETED"]},
            status=status.HTTP_204_NO_CONTENT,
        )
