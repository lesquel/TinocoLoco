from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from users.permissions import IsAdminOrReadOnly
from base.system_services import EventService
from photos.models import Photo
from photos.serializers import CreatePhotoSerializer, RetrievePhotoSerializer
from ..filters import EventFilter
from ..serializers import EventSerializer


class EventView(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = EventService.get_all()
    filterset_class = EventFilter
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_class(self):
        if self.action == "upload_image":
            return CreatePhotoSerializer
        return EventSerializer

    def retrieve(self, request, pk=None):
        event = EventService.get_by_id(pk)
        event.increment_visualizations()
        serializer = self.get_serializer(event)
        return Response({"event": serializer.data})

    @action(detail=False, methods=["get"], url_path="most-popular")
    def most_popular(self, request):
        queryset = EventService.get_most_populars()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"most_popular": serializer.data})

    @action(detail=False, methods=["get"], url_path="most-viewed")
    def most_viewed(self, request):
        queryset = EventService.get_most_viewed()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"most_viewed": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="upload-photo")
    def upload_image(self, request, pk=None):
        event = EventService.get_by_id(pk)
        image = request.FILES.get("image")

        if not image:
            return Response({"message": "Please upload an image"}, status=400)

        serializer = self.get_serializer(
            data={"image": image, "object_id": pk},
            context={"related_instance": event},
        )
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        photo = serializer.save()

        return Response({"photo": RetrievePhotoSerializer(instance=photo).data})
