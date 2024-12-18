from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from base.system_services import EventRentalService
from users.permissions import IsAdminOrOwner, IsOwner, HasVerifiedEmail
from photos.serializers import CreatePhotoSerializer, RetrievePhotoSerializer
from reviews.serializers import CreateReviewSerializer, RetrieveReviewSerializer

from ..filters import EventRentalFilter
from ..serializers import (
    EventRentalSerializer,
    ChangeEventRentalStatusSerializer,
    RentalStatusHistorySerializer,
    ConfirmEventRentalStatusSerializer,
)


class EventRentalViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Event Rentals with various actions such as uploading photos, adding reviews,
    changing status, and more.
    """

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
        }
        return action_serializers.get(self.action, EventRentalSerializer)

    def get_permissions(self):

        if self.action in ["list", "retrieve", "most_viewed"]:
            permission_classes = [AllowAny]
        elif self.action in ["create"]:
            permission_classes = [HasVerifiedEmail]
        elif self.action in ["add_review", "confirm_rental", "my_rentals"]:
            permission_classes = [IsOwner]
        elif self.action in ["update", "partial_update"]:
            permission_classes = [IsAdminOrOwner]
        elif self.action in [
            "destroy",
            "change_status",
            "status_history",
            "upload_image",
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
        event_rental.increment_visualizations()
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
