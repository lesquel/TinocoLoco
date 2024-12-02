from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from .serializers import BusinessConfigurationSerializer
from .models import BusinessConfiguration
from django.utils.translation import gettext as _

CONFIGURATION_NOT_FOUND_ERROR = _("Configuración del negocio no encontrada.")
ONLY_ONE_CONFIGURATION_ERROR = _("Solo puede haber una configuración de negocio.")


class BusinessConfigurationDetailView(APIView):

    def get(self, request, *args, **kwargs):
        configuration = BusinessConfiguration.objects.first()
        if configuration is None:
            return Response(
                {"detail": CONFIGURATION_NOT_FOUND_ERROR},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = BusinessConfigurationSerializer(configuration)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = BusinessConfigurationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except ValidationError as e:

                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        configuration = BusinessConfiguration.objects.first()
        if configuration is None:
            return Response(
                {"detail": CONFIGURATION_NOT_FOUND_ERROR},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = BusinessConfigurationSerializer(configuration, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
