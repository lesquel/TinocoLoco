from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    RetrieveBusinessConfigurationSerializer,
    UpdateBusinessConfigurationSerializer,
)
from .models import BusinessConfiguration


from base.utils import errors
from base.utils import schema_wrapper, schema_wrapper_response_only


class BusinessConfigurationDetailAPIView(APIView):
    permission_classes = [AllowAny]

    @schema_wrapper_response_only(RetrieveBusinessConfigurationSerializer)
    def get(self, request, *args, **kwargs):
        configuration, _ = BusinessConfiguration.objects.get_or_create()
        serializer = RetrieveBusinessConfigurationSerializer(configuration)
        return Response({"configuration": serializer.data}, status=status.HTTP_200_OK)

    @schema_wrapper(
        UpdateBusinessConfigurationSerializer, RetrieveBusinessConfigurationSerializer
    )
    def put(self, request, *args, **kwargs):
        self.permission_classes = [IsAdminUser]
        configuration = BusinessConfiguration.objects.first()
        if not configuration:
            raise errors.ConfigurationNotFoundError()

        serializer = UpdateBusinessConfigurationSerializer(
            instance=configuration, data=request.data, partial=True
        )
        if not serializer.is_valid():
            raise errors.ValidationError(serializer.errors)

        serializer.save()
        return Response({"configuration": serializer.data}, status=status.HTTP_200_OK)
