from django.utils.translation import gettext as _
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import status
from .serializers import BusinessConfigurationSerializer
from .models import BusinessConfiguration

from base.utils import schema_wrapper, schema_wrapper_response_only
from base.utils import errors


class BusinessConfigurationDetailView(APIView):

    def get_permissions(self):
        if self.request.method in [
            "GET",
        ]:
            return [AllowAny()]
        elif self.request.method in [
            "PUT",
        ]:
            return [IsAdminUser()]
        return super().get_permissions()

    @schema_wrapper_response_only(BusinessConfigurationSerializer)
    def get(self, request, *args, **kwargs):
        configuration, _ = BusinessConfiguration.objects.get_or_create()
        serializer = BusinessConfigurationSerializer(configuration)
        return Response({"configuration": serializer.data}, status=status.HTTP_200_OK)

    @schema_wrapper(BusinessConfigurationSerializer, BusinessConfigurationSerializer)
    def put(self, request, *args, **kwargs):
        configuration = BusinessConfiguration.objects.first()
        if configuration is None:
            raise errors.ConfigurationNotFoundError()

        serializer = BusinessConfigurationSerializer(
            instance=configuration, data=request.data, partial=True
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"configuration": serializer.data}, status=status.HTTP_200_OK
            )
        return Response(
            {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )
