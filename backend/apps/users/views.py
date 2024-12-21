from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated


from base.system_services import UserService

from .permissions import IsAdminOrSelf, HasVerifiedEmail
from .serializers import (
    RetrieveUserSerializer,
    CreateUserSerializer,
    UpdateUserSerializer,
    LoginUserSerializer,
    ChangeLanguageSerializer,
    ValidateEmailSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
)
from .filters import UserFilter
from .messages import SUCCESS_MESSAGES


class UserViewSet(viewsets.ModelViewSet):

    queryset = UserService.get_all().order_by("id")
    filterset_class = UserFilter
    http_method_names = ["get", "post", "put", "delete"]

    def get_permissions(self):

        if self.action in ["create", "login"]:
            permission_classes = [AllowAny]
        elif self.action in [
            "update",
            "send_password_reset_code",
            "reset_password",
        ]:
            permission_classes = [HasVerifiedEmail]
        elif self.action in ["destroy", "retrieve"]:
            permission_classes = [IsAdminOrSelf]
        elif self.action in ["logout", "change_language", "validate_email"]:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]

        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        action_serializers = {
            "create": CreateUserSerializer,
            "update": UpdateUserSerializer,
            "login": LoginUserSerializer,
            "change_language": ChangeLanguageSerializer,
            "validate_email": ValidateEmailSerializer,
            "send_password_reset_code": PasswordResetRequestSerializer,
            "reset_password": PasswordResetConfirmSerializer,
        }
        return action_serializers.get(self.action, RetrieveUserSerializer)

    def get_object(self):
        obj = UserService.get_by_id(self.kwargs.get("pk"))
        self.check_object_permissions(self.request, obj)
        return obj

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        user = data.get("user")
        token = data.get("token")
        return Response(
            {
                "token": token.key,
                "user": RetrieveUserSerializer(instance=user).data,
            },
            status=status.HTTP_201_CREATED,
        )

    def retrieve(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(instance=user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        user_to_update = self.get_object()
        serializer = self.get_serializer(
            instance=user_to_update,
            data=request.data,
            partial=True,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            RetrieveUserSerializer(instance=serializer.instance).data,
            status=status.HTTP_200_OK,
        )

    def destroy(self, request, pk=None):
        user_to_delete = self.get_object()
        UserService.delete_user(user_to_delete)
        return Response(
            {"detail": SUCCESS_MESSAGES["USER_DELETED"]},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
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
    def logout(self, request):
        UserService.logout_user(request.user)
        return Response(
            {"detail": SUCCESS_MESSAGES["LOGGED_OUT"]}, status=status.HTTP_200_OK
        )

    @action(
        detail=False,
        methods=["put"],
        permission_classes=[IsAuthenticated],
        url_path="change-language",
    )
    def change_language(self, request):
        serializer = self.get_serializer(instance=request.user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                "detail": SUCCESS_MESSAGES["LANGUAGE_UPDATED"].format(
                    serializer.data.get("preferred_language")
                )
            },
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=["post"],
        url_path="validate-email",
    )
    def validate_email(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": SUCCESS_MESSAGES["EMAIL_VERIFIED"]},
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=["post"],
        url_path="send-password-reset-code",
    )
    def send_password_reset_code(self, request):

        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": SUCCESS_MESSAGES["PASSWORD_RESET_CODE_SENT"]},
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=["post"],
        url_path="reset-password",
    )
    def reset_password(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": SUCCESS_MESSAGES["PASSWORD_RESET_SUCCESS"]},
            status=status.HTTP_200_OK,
        )
