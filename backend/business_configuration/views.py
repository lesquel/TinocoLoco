from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import status
from .serializers import BusinessConfigurationSerializer
from .models import BusinessConfiguration
from django.utils.translation import gettext as _

CONFIGURATION_NOT_FOUND_ERROR = _("Configuración del negocio no encontrada.")


class BusinessConfigurationDetailView(APIView):

    def get(self, request, *args, **kwargs):
        configuration, created = BusinessConfiguration.objects.get_or_create()

        serializer = BusinessConfigurationSerializer(configuration)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        configuration = BusinessConfiguration.objects.first()
        if configuration is None:
            return Response(
                {"detail": CONFIGURATION_NOT_FOUND_ERROR},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = BusinessConfigurationSerializer(instance=configuration, data=request.data,partial=True)
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

