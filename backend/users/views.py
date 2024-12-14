from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser

from django.utils.translation import gettext as _


from base.system_services import UserService
from base.utils import errors

from .permissions import IsAdminOrOwner
from .serializers import (
    RetrieveUserSerializer,
    CreateUserSerializer,
    UpdateUserSerializer,
    LoginUserSerializer,
    ChangeLanguageSerializer,
)
from .filters import UserFilter
from .messages import SUCCESS_MESSAGES


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserService.get_all().order_by("id")
    filterset_class = UserFilter
    http_method_names = ["get", "post", "put", "delete"]

    def get_permissions(self):
        if self.action in ["create", "login"]:
            return [AllowAny()]
        elif self.action in ["update", "destroy"]:
            return [IsAdminOrOwner()]
        elif self.action in ["list"]:
            return [IsAdminUser()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create":
            return CreateUserSerializer
        elif self.action == "update":
            return UpdateUserSerializer
        elif self.action == "login":
            return LoginUserSerializer
        elif self.action == "change_language":
            return ChangeLanguageSerializer
        return RetrieveUserSerializer

    def list(self, request):
        return super().list(request)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            raise errors.ValidationError(serializer.errors)

        data = serializer.save()
        user = data.get("user")
        token = data.get("token")

        return Response(
            {"token": token.key, "user": RetrieveUserSerializer(instance=user).data},
            status=status.HTTP_201_CREATED,
        )

    def retrieve(self, request, pk=None):

        user = UserService.get_by_id(pk)

        serializer = self.get_serializer(instance=user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        user_to_update = UserService.get_by_id(pk)

        serializer = self.get_serializer(
            instance=user_to_update,
            context={"request": request},
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():

            raise errors.ValidationError(serializer.errors)

        serializer.save()
        return Response(
            {"user": RetrieveUserSerializer(instance=serializer.instance).data},
            status=status.HTTP_200_OK,
        )

    def destroy(self, request, pk=None):
        user_to_delete = UserService.get_by_id(pk)

        UserService.delete_user(user_to_delete)
        return Response(
            {"detail": SUCCESS_MESSAGES["USER_DELETED"]},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(
        detail=False,
        methods=["post"],
    )
    def login(self, request):

        serializer = self.get_serializer(data=request.data)
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

    @action(detail=False, methods=["post"])
    def logout(self, request):
        UserService.logout_user(request.user)
        return Response(
            {"detail": SUCCESS_MESSAGES["LOGGED_OUT"]}, status=status.HTTP_200_OK
        )

    @action(
        detail=False,
        methods=["put"],
    )
    def change_language(self, request):
        user = request.user
        serializer = self.get_serializer(instance=user, data=request.data)
        if not serializer.is_valid():
            raise errors.ValidationError(serializer.errors)
        serializer.save()
        return Response(
            {
                "detail": SUCCESS_MESSAGES["LANGUAGE_UPDATED"].format(
                    serializer.data.get("preferred_language")
                )
            },
            status=status.HTTP_200_OK,
        )
