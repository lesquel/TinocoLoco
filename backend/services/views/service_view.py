from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action

from users.permissions import IsAdminOrReadOnly
from base.system_services import ServiceService
from photos.serializers import CreatePhotoSerializer, RetrievePhotoSerializer
from ..serializers import ServiceSerializer
from ..filters import ServiceFilter


class ServiceView(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "put", "delete"]
    filterset_class = ServiceFilter
    permission_classes = [IsAdminOrReadOnly]
    queryset = ServiceService.get_all()
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_class(self):
        if self.action == "upload_image":
            return CreatePhotoSerializer
        return ServiceSerializer

    @action(detail=False, methods=["get"], url_path="most-popular")
    def most_popular(self, request):
        queryset = ServiceService.get_most_populars()
        serializer = ServiceSerializer(queryset, many=True)
        return Response({"most_popular": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="upload-photo")
    def upload_image(self, request, pk=None):
        service = ServiceService.get_by_id(pk)
        image = request.FILES.get("image")

        if not image:
            return Response({"message": "Please upload an image"}, status=400)

        serializer = CreatePhotoSerializer(
            data={"image": image, "object_id": pk},
            context={"related_instance": service},
        )
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        photo = serializer.save()

        return Response({"photo": RetrievePhotoSerializer(instance=photo).data})
