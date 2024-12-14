from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .serializers import (
    CreateBusinessConfigurationSerializer,
    RetrieveBusinessConfigurationSerializer,
)
from .models import BusinessConfiguration
from base.utils import errors


class BusinessConfigurationViewSet(viewsets.ModelViewSet):
    queryset = BusinessConfiguration.objects.all()
    serializer_class = CreateBusinessConfigurationSerializer
    parser_classes = [MultiPartParser]

    http_method_names = ["get", "put"]

    def get_permissions(self):
        if self.action == "update":
            return [IsAdminUser()]
        elif self.action == "retrieve":
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "retrieve":
            return RetrieveBusinessConfigurationSerializer
        return CreateBusinessConfigurationSerializer

    def retrieve(self, request, *args, **kwargs):
        configuration, _ = BusinessConfiguration.objects.get_or_create()
        serializer = self.get_serializer(configuration)
        return Response({"configuration": serializer.data}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        configuration = BusinessConfiguration.objects.first()
        if not configuration:
            raise errors.ConfigurationNotFoundError()

        serializer = self.get_serializer(
            instance=configuration, data=request.data, partial=True
        )
        if not serializer.is_valid():
            raise errors.ValidationError(serializer.errors)

        serializer.save()
        return Response({"configuration": serializer.data}, status=status.HTTP_200_OK)
