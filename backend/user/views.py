from rest_framework.viewsets import ViewSet
from rest_framework.views import APIView
from django.contrib.auth import authenticate

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from .serializers import CustomUserSerializer
from django.utils.translation import gettext as _, activate, get_language
from django.utils import translation
from django.conf import settings

from .models import CustomUser

MUST_PROVIDE_BOTH_EMAIL_AND_PASSWORD = _("Por favor, ingresar su usuario y contraseña")
INVALID_CREDENTIALS = _("Credenciales inválidas")
ALREADY_LOGGED_IN = _("Ya ha iniciado sesión")
NOT_LOGGED_IN = _("No ha iniciado sesión")
SUCESSFULLY_LOGGED_OUT = _("Desconectado exitosamente")
INVALID_DATA = _("Datos inválidos")
DONT_HAVE_PERMISSIONS = _("No tiene permisos para realizar esta acción")
USER_NOT_FOUND = _("Usuario no encontrado")
USER_DELETED = _("Usuario eliminado exitosamente")
HAVENT_LOGGED_IN = _("No ha iniciado sesión")


LANGUAGE_NOT_SUPORTED = _("Idioma no soportado")
LANGUAGE_UPDATED = _("Idioma actualizado correctamente a {}.")


class UserViewSet(ViewSet):

    def get_permissions(self):
        if self.action in ["create", "login"]:
            return [AllowAny()]
        return super().get_permissions()

    def create(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(
            {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )

    def retrieve(self, request, pk=None):
        try:
            user = CustomUser.objects.get(id=pk)
        except CustomUser.DoesNotExist:
            return Response(
                {"errors": USER_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = CustomUserSerializer(instance=user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        if pk != str(request.user.id):
            return Response(
                {"errors": DONT_HAVE_PERMISSIONS}, status=status.HTTP_403_FORBIDDEN
            )

        serializer = CustomUserSerializer(
            instance=request.user, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"user": serializer.data}, status=status.HTTP_200_OK)
        return Response(
            {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, pk=None):
        if pk != str(request.user.id):
            return Response(
                {"errors": DONT_HAVE_PERMISSIONS}, status=status.HTTP_403_FORBIDDEN
            )

        request.user.delete()
        return Response({"detail": USER_DELETED}, status=status.HTTP_200_OK)

    @action(
        detail=False,
        methods=["post"],
    )
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return Response(
                {"errors": MUST_PROVIDE_BOTH_EMAIL_AND_PASSWORD},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = authenticate(username=username, password=password)
        if user is None:
            return Response(
                {"errors": INVALID_CREDENTIALS}, status=status.HTTP_400_BAD_REQUEST
            )

        token, _ = Token.objects.get_or_create(user=user)
        serializer = CustomUserSerializer(instance=user)

        return Response(
            {"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK
        )

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def logout(self, request):
        token = Token.objects.filter(user=request.user).first()
        if token:
            token.delete()
            return Response(
                {"detail": SUCESSFULLY_LOGGED_OUT}, status=status.HTTP_200_OK
            )
        return Response(
            {"errors": HAVENT_LOGGED_IN}, status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=["put"], permission_classes=[IsAuthenticated])
    def change_language(self, request):
        language = request.data.get("preferred_language", "en")

        if not language in dict(settings.LANGUAGES):
            return Response(
            {"status": LANGUAGE_NOT_SUPORTED}, status=status.HTTP_400_BAD_REQUEST
        )

        user = request.user
        user.preferred_language = language
        user.save()

        activate(language)

        response = Response(
            {"status": LANGUAGE_UPDATED.format(language)}, status=status.HTTP_200_OK
        )
        response.set_cookie(settings.LANGUAGE_COOKIE_NAME, language)

        return response

