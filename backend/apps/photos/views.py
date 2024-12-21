from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import viewsets


from base.system_services import PhotoService
from base.utils import ImageUtils

from .messages import SUCCESS_MESSAGES 

class PhotoView(viewsets.ModelViewSet):
    queryset = PhotoService.get_all()
    permission_classes = [IsAdminUser]
    http_method_names = ['delete']
    


    def delete(self, request, pk=None):
        photo = PhotoService.get_by_id(pk)

        ImageUtils.delete_image(photo.image)
        PhotoService.delete(photo.id)

        return Response(
            {"detail": SUCCESS_MESSAGES["PHOTO_DELETED"]},
            status=status.HTTP_204_NO_CONTENT,
        )
