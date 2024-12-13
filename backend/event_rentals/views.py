from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from base.system_services import EventRentalService
from django.utils.translation import gettext as _

from photos.serializers import CreatePhotoSerializer, RetrievePhotoSerializer
from .models import EventRental

# from .serializers import EventRentalSerializer
PLEASE_UPLOAD_IMAGE = _("Por favor, sube una imagen")


class EventViewSet(viewsets.ModelViewSet):
    queryset = EventRentalService.get_all()
    # serializer_class = EventRentalSerializer

    @action(detail=True, methods=["post"], url_path="upload-photo")
    def upload_image(self, request, pk=None):
        service = EventRentalService.get_by_id(pk)
        image = request.FILES.get("image")

        if not image:
            return Response(
                {"message": PLEASE_UPLOAD_IMAGE}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CreatePhotoSerializer(
            data={"image": image, "object_id": pk},
            context={"related_instance": service},
        )
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        photo = serializer.save()

        return Response({"photo": RetrievePhotoSerializer(instance=photo).data})
