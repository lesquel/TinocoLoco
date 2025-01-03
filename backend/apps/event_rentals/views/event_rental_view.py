from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from base.mixins import (
    PaginationMixin,
    UploadImagesViewMixin,
    MostViewedMixin,
    RetrieveMixin,
)
from base.utils import errors
from base.system_services import (
    EventRentalService,
    ServiceService,
    ServicesEventRentalService,
)

from apps.users.permissions import IsAdminOrOwner, IsOwner, HasVerifiedEmail
from apps.reviews.serializers import CreateReviewSerializer, RetrieveReviewSerializer
from apps.photos.serializers import CreatePhotoSerializer
from ..messages import SUCCESS_MESSAGES
from ..filters import EventRentalFilter
from ..serializers import (
    CreateEventRentalSerializer,
    UpdateEventRentalSerializer,
    RetrieveEventRentalSerializer,
    ChangeEventRentalStatusSerializer,
    RentalStatusHistorySerializer,
    SendEventRentalConfirmationCodeSerializer,
    ConfirmEventRentalSerializer,
    RetrieveServiceEventRentalSerializer,
    CreateServiceEventRentalSerializer,
)


class EventRentalViewSet(
    PaginationMixin,
    UploadImagesViewMixin,
    MostViewedMixin,
    RetrieveMixin,
    viewsets.ModelViewSet,
):

    http_method_names = ["get", "post", "put", "delete"]
    queryset = EventRentalService.get_all().order_by("-id")
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filterset_class = EventRentalFilter

    def get_serializer_class(self):
        action_serializers = {
            "create": CreateEventRentalSerializer,
            "update": UpdateEventRentalSerializer,
            "partial_update": UpdateEventRentalSerializer,
            "change_status": ChangeEventRentalStatusSerializer,
            "status_history": RentalStatusHistorySerializer,
            "add_review": CreateReviewSerializer,
            "add_services": CreateServiceEventRentalSerializer,
            "upload_images": CreatePhotoSerializer,
            "send_confirmation_email": SendEventRentalConfirmationCodeSerializer,
            "confirm_rental": ConfirmEventRentalSerializer,
        }
        return action_serializers.get(self.action, RetrieveEventRentalSerializer)

    def get_permissions(self):
        permission_map = {
            "list": [AllowAny],
            "retrieve": [AllowAny],
            "most_viewed": [AllowAny],
            "create": [HasVerifiedEmail],
            "confirm_rental": [IsOwner],
            "my_rentals": [IsOwner],
            "update": [IsAdminOrOwner],
            "partial_update": [IsAdminOrOwner],
            "add_review": [IsAdminOrOwner],
            "services": [IsAdminOrOwner],
            "add_services": [IsAdminOrOwner],
            "status_history": [IsAdminOrOwner],
            "destroy": [IsAdminUser],
            "change_status": [IsAdminUser],
            "upload_images": [IsAdminUser],
            "remove_service": [IsAdminUser],
            "send_confirmation_email": [IsOwner],
            "confirm_rental": [IsOwner],
        }
        permission_classes = permission_map.get(self.action, [IsAuthenticated])
        return [permission() for permission in permission_classes]

    def get_object(self):

        obj = EventRentalService.get_by_id(self.kwargs.get("pk"))
        self.check_object_permissions(self.request, obj)
        return obj

    def assign_review_to_rental(self, event_rental, review, user):
        if user.is_superuser:
            event_rental.owner_rating = review
        else:
            event_rental.costumer_rating = review
        event_rental.save()

    def get_most_viewed_queryset(self):
        return EventRentalService.get_most_viewed()

    def create(self, request):
        serializer = self.get_serializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        event_rental = serializer.save()
        return Response(
            RetrieveEventRentalSerializer(instance=event_rental).data,
            status=status.HTTP_201_CREATED,
        )

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

        self.assign_review_to_rental(event_rental, review, request.user)

        return Response(
            RetrieveReviewSerializer(instance=review).data,
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=["post"], url_path="send-confirmation-email")
    def send_confirmation_email(self, request, pk=None):
        event_rental = self.get_object()
        serializer = self.get_serializer(
            data={},
            context={"event_rental": event_rental},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": SUCCESS_MESSAGES["CONFIRMATION_EMAIL_SENT"]},
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["post"], url_path="confirm-rental")
    def confirm_rental(self, request):

        serializer = self.get_serializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)

        event_rental = serializer.update(serializer.instance, serializer.validated_data)
        return Response(
            RetrieveEventRentalSerializer(instance=event_rental).data,
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"], url_path="change-status")
    def change_status(self, request, pk=None):
        event_rental = self.get_object()
        serializer = self.get_serializer(
            instance=event_rental, data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        serializer.update(serializer.instance, serializer.validated_data)
        return Response(
            RetrieveEventRentalSerializer(instance=event_rental).data,
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["get"], url_path="status-history")
    def status_history(self, request, pk=None):

        history = self.get_object().rental.all()
        return self.paginate_and_respond(history)

    @action(detail=False, methods=["get"], url_path="my-rentals")
    def my_rentals(self, request):

        rentals = EventRentalService.get_all().filter(owner=request.user)
        return self.paginate_and_respond(rentals)

    @action(detail=True, methods=["post"], url_path="add-services")
    def add_services(self, request, pk=None):

        event_rental = self.get_object()

        serializer = self.get_serializer(
            data=request.data, context={"event_rental": event_rental}, many=True
        )

        serializer.is_valid(raise_exception=True)
        event_rental_services = serializer.save()

        service_serializer = RetrieveServiceEventRentalSerializer(
            event_rental_services, many=True
        )

        return Response(
            service_serializer.data,
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=["post"], url_path="remove-service")
    def remove_service(self, request, pk=None):
        event_rental = self.get_object()
        if event_rental.status != "pending":
            raise errors.CannotDeletePendingEventRentalError()

        service_id = request.data.get("service_id")

        if not service_id:
            raise errors.ServiceIdRequiredError()

        service = ServiceService.get_by_id(service_id)

        event_rental_service = (
            ServicesEventRentalService.get_all()
            .filter(eventrental=event_rental, service=service)
            .first()
        )

        if not event_rental_service:
            raise errors.ServiceNotAssociatedError()

        ServicesEventRentalService.delete(event_rental_service.id)

        return Response(
            {"detail": SUCCESS_MESSAGES["SERVICE_DELETED"]},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(detail=True, methods=["get"], url_path="services")
    def services(self, request, pk=None):

        event_rental = self.get_object()
        services = event_rental.event_rental_services.all()
        serializer = RetrieveServiceEventRentalSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
