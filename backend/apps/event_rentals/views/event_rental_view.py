from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from base.system_services import (
    EventRentalService,
    ServiceService,
    ServicesEventRentalService,
)
from apps.users.permissions import IsAdminOrOwner, IsOwner, HasVerifiedEmail
from apps.photos.serializers import CreatePhotoSerializer, RetrievePhotoSerializer
from apps.reviews.serializers import CreateReviewSerializer, RetrieveReviewSerializer

from ..filters import EventRentalFilter
from ..serializers import (
    EventRentalSerializer,
    ChangeEventRentalStatusSerializer,
    RentalStatusHistorySerializer,
    ConfirmEventRentalStatusSerializer,
    RetrieveServiceEventRentalSerializer,
    CreateServiceEventRentalSerializer,
)


class EventRentalViewSet(viewsets.ModelViewSet):

    http_method_names = ["get", "post", "put", "delete"]
    queryset = EventRentalService.get_all().order_by("-id")
    parser_classes = [MultiPartParser, FormParser]
    filterset_class = EventRentalFilter

    def get_serializer_class(self):
        action_serializers = {
            "create": EventRentalSerializer,
            "update": EventRentalSerializer,
            "partial_update": EventRentalSerializer,
            "change_status": ChangeEventRentalStatusSerializer,
            "status_history": RentalStatusHistorySerializer,
            "confirm_rental": ConfirmEventRentalStatusSerializer,
            "upload_image": CreatePhotoSerializer,
            "add_review": CreateReviewSerializer,
            "add_service": CreateServiceEventRentalSerializer,
        }
        return action_serializers.get(self.action, EventRentalSerializer)

    def get_permissions(self):

        if self.action in ["list", "retrieve", "most_viewed"]:
            permission_classes = [AllowAny]
        elif self.action in ["create"]:
            permission_classes = [HasVerifiedEmail]
        elif self.action in ["confirm_rental", "my_rentals"]:
            permission_classes = [IsOwner]
        elif self.action in [
            "update",
            "partial_update",
            "add_review",
        ]:
            permission_classes = [IsAdminOrOwner]
        elif self.action in [
            "destroy",
            "change_status",
            "status_history",
            "upload_image",
            "add_service",
            "remove_service",
        ]:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_object(self):

        obj = EventRentalService.get_by_id(self.kwargs.get("pk"))
        self.check_object_permissions(self.request, obj)
        return obj

    def retrieve(self, request, pk=None):
        event_rental = self.get_object()
        event_rental.increase_view_count()
        serializer = self.get_serializer(instance=event_rental)
        return Response({"event_rental": serializer.data})

    @action(detail=False, methods=["get"], url_path="most-viewed")
    def most_viewed(self, request):

        queryset = EventRentalService.get_most_viewed()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"most_viewed": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="upload-photo")
    def upload_image(self, request, pk=None):

        event_rental = self.get_object()
        serializer = self.get_serializer(
            data={"image": request.FILES.get("image"), "object_id": pk},
            context={"related_instance": event_rental},
        )
        serializer.is_valid(raise_exception=True)
        photo = serializer.save()
        return Response({"photo": RetrievePhotoSerializer(instance=photo).data})

    @action(detail=True, methods=["post"], url_path="add-review")
    def add_review(self, request, pk=None):

        event_rental = self.get_object()
        serializer = self.get_serializer(
            data={
                "rating_score": request.data.get("rating_score"),
                "rating_comment": request.data.get("rating_comment"),
            },
            context={"related_instance": event_rental, "owner": request.user},
        )
        serializer.is_valid(raise_exception=True)
        review = serializer.save()

        if request.user.is_superuser:
            event_rental.owner_rating = review
        else:
            event_rental.costumer_rating = review

        event_rental.save()
        return Response({"review": RetrieveReviewSerializer(instance=review).data})

    @action(detail=False, methods=["post"], url_path="confirm-rental")
    def confirm_rental(self, request):

        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        event_rental = EventRentalService.get_by_confirmation_code(
            request.data.get("confirmation_code")
        )
        return Response(
            {"event_rental": EventRentalSerializer(instance=event_rental).data}
        )

    @action(detail=True, methods=["post"], url_path="change-status")
    def change_status(self, request, pk=None):

        event_rental = self.get_object()
        serializer = self.get_serializer(
            instance=event_rental, data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"event_rental": EventRentalSerializer(instance=event_rental).data}
        )

    @action(detail=True, methods=["get"], url_path="status-history")
    def status_history(self, request, pk=None):

        history = EventRentalService.get_by_id(pk).rental.all()
        serializer = self.get_serializer(history, many=True)
        return Response({"history": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="my-rentals")
    def my_rentals(self, request):

        rentals = EventRentalService.get_all().filter(owner=request.user)
        serializer = self.get_serializer(rentals, many=True)
        return Response({"my_rentals": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="add-service")
    def add_service(self, request, pk=None):

        event_rental = self.get_object()

        serializer = CreateServiceEventRentalSerializer(
            data=request.data, context={"event_rental": event_rental}
        )

        if serializer.is_valid(raise_exception=True):
            event_rental_service = serializer.save()

            service_serializer = RetrieveServiceEventRentalSerializer(
                event_rental_service
            )

            return Response(
                {"event_rental_service": service_serializer.data},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["post"], url_path="remove-service")
    def remove_service(self, request, pk=None):
        event_rental = self.get_object()
        if event_rental.status != "pending":
            return Response(
                {
                    "detail": "No puedes eliminar servicios de un alquiler de evento que no esté pendiente."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        service_id = request.data.get("service_id")

        if not service_id:
            return Response(
                {"detail": "service_id es obligatorio."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        service = ServiceService.get_by_id(service_id)

        event_rental_service = (
            ServicesEventRentalService.get_all()
            .filter(eventrental=event_rental, service=service)
            .first()
        )

        if not event_rental_service:
            return Response(
                {
                    "detail": "Este servicio no está asociado con este alquiler de evento."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        ServicesEventRentalService.delete(event_rental_service.id)

        return Response(
            {"detail": "Servicio eliminado correctamente."},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(detail=True, methods=["get"], url_path="services")
    def services(self, request, pk=None):

        event_rental = self.get_object()
        services = event_rental.event_rental_services.all()
        serializer = RetrieveServiceEventRentalSerializer(services, many=True)
        return Response({"services": serializer.data}, status=status.HTTP_200_OK)