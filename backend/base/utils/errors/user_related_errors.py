from rest_framework import status
from .baseError import BaseError
from django.utils.translation import gettext_lazy as _

# Translated error messages
INVALID_ROLE = _("Rol inválido")
MUST_PROVIDE_BOTH_EMAIL_AND_PASSWORD = _("Por favor, ingresar su usuario y contraseña")
INVALID_CREDENTIALS = _("Credenciales inválidas")
INDALID_IDENTITY_CARD = _("Cédula inválida")
DONT_HAVE_PERMISSIONS = _("No tiene permisos para realizar esta acción")
HAVENT_LOGGED_IN = _("No ha iniciado sesión")
USER_NOT_FOUND = _("Usuario no encontrado")
LANGUAGE_NOT_SUPPORTED = _("Idioma no soportado")
USERNAME_ALREADY_EXISTS = _("Este nombre de usuario ya está en uso.")
IDENTITY_CARD_ALREADY_EXISTS = _("Este número de cédula ya está registrado.")
EMAIL_ALREADY_EXISTS = _("Este correo electrónico ya está registrado")
EMAIL_DOES_NOT_EXIST = _("Este correo electrónico no está registrado")

INVALID_CODE = _("Código no válido.")
CODE_EXPIRED = _("El código ha expirado.")
CODE_USED = _("El código ya ha sido utilizado.")


# Custom exception classes
class InvalidRoleError(BaseError):
    def __init__(self):
        super().__init__(
            message=INVALID_ROLE, code=status.HTTP_400_BAD_REQUEST, identifier="role"
        )


class MissingFieldsLoginError(BaseError):
    def __init__(self):
        super().__init__(
            message=MUST_PROVIDE_BOTH_EMAIL_AND_PASSWORD,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="missing_fields_login",
        )


class InvalidCredentialsError(BaseError):
    def __init__(self):
        super().__init__(
            message=INVALID_CREDENTIALS,
            code=status.HTTP_401_UNAUTHORIZED,
            identifier="invalid_credentials",
        )


class InvalidPermissionsError(BaseError):
    def __init__(self):
        super().__init__(
            message=DONT_HAVE_PERMISSIONS,
            code=status.HTTP_403_FORBIDDEN,
            identifier="invalid_permissions",
        )


class UserNotLoggedError(BaseError):
    def __init__(self):
        super().__init__(
            message=HAVENT_LOGGED_IN,
            code=status.HTTP_401_UNAUTHORIZED,
            identifier="user_not_logged_in",
        )


class UserNotFoundError(BaseError):
    def __init__(self):
        super().__init__(
            message=USER_NOT_FOUND,
            code=status.HTTP_404_NOT_FOUND,
            identifier="user_not_found",
        )


class InvalidLanguageError(BaseError):
    def __init__(self):
        super().__init__(
            message=LANGUAGE_NOT_SUPPORTED,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="language",
        )


class UsernameAlreadyExistsError(BaseError):
    def __init__(self):
        super().__init__(
            message=USERNAME_ALREADY_EXISTS,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="username",
        )


class IdentityCardAlreadyExistsError(BaseError):
    def __init__(self):
        super().__init__(
            message=IDENTITY_CARD_ALREADY_EXISTS,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="identity_card",
        )


class InvalidIdentityCardError(BaseError):
    def __init__(self):
        super().__init__(
            message=INDALID_IDENTITY_CARD,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="identity_card",
        )


class EmailAlreadyExistsError(BaseError):
    def __init__(self):
        super().__init__(
            message=EMAIL_ALREADY_EXISTS,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="email",
        )


class EmailDoesNotExistError(BaseError):
    def __init__(self):
        super().__init__(
            message=EMAIL_DOES_NOT_EXIST,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="email",
        )


class InvalidCodeError(BaseError):
    def __init__(self):
        super().__init__(
            message=INVALID_CODE, code=status.HTTP_400_BAD_REQUEST, identifier="code"
        )


class CodeExpiredError(BaseError):
    def __init__(self):
        super().__init__(
            message=CODE_EXPIRED, code=status.HTTP_400_BAD_REQUEST, identifier="code"
        )


class CodeUsedError(BaseError):
    def __init__(self):
        super().__init__(
            message=CODE_USED, code=status.HTTP_400_BAD_REQUEST, identifier="code"
        )
