from rest_framework.viewsets import ViewSet
from rest_framework.authentication import authenticate
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from base.services import UserService
from base.utils import ErrorHandler
from base.utils import errors
from django.utils.translation import gettext as _, activate
from django.conf import settings

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import (
    LoginUserSerializer,
    RetrieveUserSerializer,
    CreateUserSerializer,
    UpdateUserSerializer,
)


SUCESSFULLY_LOGGED_OUT = _("Desconectado exitosamente")
USER_DELETED = _("Usuario eliminado exitosamente")

LANGUAGE_UPDATED = _("Idioma actualizado correctamente a {}.")



class UserViewSet(ViewSet):

    def get_permissions(self):
        if self.action in ["create", "login"]:
            return [AllowAny()] 
        return super().get_permissions()

    @swagger_auto_schema(
        request_body=CreateUserSerializer,
        responses={201: CreateUserSerializer()},
        operation_description="Create a new user",
    )
    @ErrorHandler()
    def create(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if not serializer.is_valid():
            raise errors.ValidationError(serializer.errors)
        serializer.save()
        return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        responses={200: RetrieveUserSerializer()},
        operation_description="Retrieve user details by ID",
    )
    @ErrorHandler()
    def retrieve(self, request, pk=None):

        user = UserService.get_user_by_id(pk)

        serializer = RetrieveUserSerializer(instance=user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=UpdateUserSerializer,
        responses={200: UpdateUserSerializer()},
        operation_description="Update user details",
    )
    @ErrorHandler()
    def update(self, request, pk=None):
        if pk != str(request.user.id):
            raise errors.InvalidPermissionsError()

        serializer = UpdateUserSerializer(
            instance=request.user, data=request.data, partial=True
        )
        if not serializer.is_valid():
            raise errors.ValidationError(serializer.errors)
        serializer.save()
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)

    @ErrorHandler()
    def destroy(self, request, pk=None):
        user = request.user
        if not user:
            raise errors.UserNotFoundError()

        if pk != str(user.id):
            raise errors.InvalidPermissionsError()

        UserService.delete_user(user)
        return Response({"detail": USER_DELETED}, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=LoginUserSerializer,
        responses={
            200: openapi.Response(
                description="Token response",
                schema=openapi.Schema(type=openapi.TYPE_STRING),
            )
        },
    )
    @action(detail=False,methods=["post"],)
    @ErrorHandler()
    def login(self, request):

        serializer = LoginUserSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data.get("token")
            user = serializer.validated_data.get("user")
            return Response(
                {
                    "token": token.key,
                    "user": RetrieveUserSerializer(instance=user).data,
                },
                status=status.HTTP_200_OK,
            )

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    @ErrorHandler()
    def logout(self, request):
        UserService.logout_user(request.user)
        return Response({"detail": SUCESSFULLY_LOGGED_OUT}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["put"], permission_classes=[IsAuthenticated])
    @ErrorHandler()
    def change_language(self, request):
        language = request.data.get("preferred_language", "en")
        user = request.user
        UserService.change_user_language(request.user, language)

        activate(language)

        response = Response(
            {"status": LANGUAGE_UPDATED.format(language)}, status=status.HTTP_200_OK
        )
        response.set_cookie(settings.LANGUAGE_COOKIE_NAME, language)

        return response
