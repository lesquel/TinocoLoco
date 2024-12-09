from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.utils.translation import gettext as _, activate
from django.conf import settings

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


from base.services import UserService
from base.utils import (
    ErrorHandler,
    errors,
    schema_wrapper,
    schema_wrapper_response_only,
)


from .permissions import IsAdminOrOwner

from .serializers import (
    RetrieveUserSerializer,
    CreateUserSerializer,
    UpdateUserSerializer,
    LoginUserSerializer,
    ChangeLanguageSerializer,
)


SUCCESSFULLY_LOGGED_OUT = _("Desconectado exitosamente")
USER_DELETED = _("Usuario eliminado exitosamente")

LANGUAGE_UPDATED = _("Idioma actualizado correctamente a {}.")


class UserViewSet(ViewSet):

    def get_permissions(self):
        if self.action in ["create", "login"]:
            return [AllowAny()]
        elif self.action in ["update", "destroy"]:
            return [IsAdminOrOwner()]
        return super().get_permissions()

    @schema_wrapper(CreateUserSerializer, CreateUserSerializer, 201)
    @ErrorHandler()
    def create(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if not serializer.is_valid():
            raise errors.ValidationError(serializer.errors)
        serializer.save()
        return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)

    @schema_wrapper_response_only(RetrieveUserSerializer)
    @ErrorHandler()
    def retrieve(self, request, pk=None):

        user = UserService.get_user_by_id(pk)

        serializer = RetrieveUserSerializer(instance=user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)

    @schema_wrapper(UpdateUserSerializer, UpdateUserSerializer)
    @ErrorHandler()
    def update(self, request, pk=None):
        user_to_update = UserService.get_user_by_id(pk)

        serializer = UpdateUserSerializer(
            instance=user_to_update,
            context={"request": request},
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():

            raise errors.ValidationError(serializer.errors)

        serializer.save()
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)

    @ErrorHandler()
    def destroy(self, request, pk=None):
        user_to_delete = UserService.get_user_by_id(pk)

        UserService.delete_user(user_to_delete)
        return Response({"detail": USER_DELETED}, status=status.HTTP_200_OK)

    @schema_wrapper(
        LoginUserSerializer,
        openapi.Schema(type=openapi.TYPE_STRING, description="Token response"),
    )
    @action(
        detail=False,
        methods=["post"],
    )
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
        return Response({"detail": SUCCESSFULLY_LOGGED_OUT}, status=status.HTTP_200_OK)

    @schema_wrapper(ChangeLanguageSerializer, ChangeLanguageSerializer)
    @action(detail=False, methods=["put"], permission_classes=[IsAuthenticated])
    @ErrorHandler()
    def change_language(self, request):
        user = request.user
        serializer = ChangeLanguageSerializer(instance=user, data=request.data)
        if not serializer.is_valid():
            raise errors.ValidationError(serializer.errors)
        serializer.save()

        language = request.data.get("language", settings.LANGUAGE_CODE)
        return Response(
            {"detail": LANGUAGE_UPDATED.format(language)}, status=status.HTTP_200_OK
        )
