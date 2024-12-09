from rest_framework import status
from .baseError import BaseError
from django.utils.translation import gettext as _

# Translated error messages
HAVENT_LOGGED_IN = _("No ha iniciado sesión")
LANGUAGE_NOT_SUPPORTED = _("Idioma no soportado")
INVALID_CREDENTIALS = _("Credenciales inválidas")
DONT_HAVE_PERMISSIONS = _("No tiene permisos para realizar esta acción")
USER_NOT_FOUND = _("Usuario no encontrado")
INVALID_ROLE = _("Rol inválido")
MUST_PROVIDE_BOTH_EMAIL_AND_PASSWORD = _("Por favor, ingresar su usuario y contraseña")

# Custom exception classes
class InvalidRoleError(BaseError):
    def __init__(self):
        super().__init__(message=INVALID_ROLE, code=status.HTTP_400_BAD_REQUEST, identifier="invalid_role")


class MissingFieldsLoginError(BaseError):
    def __init__(self):
        super().__init__(message=MUST_PROVIDE_BOTH_EMAIL_AND_PASSWORD, code=status.HTTP_400_BAD_REQUEST, identifier="missing_fields_login")


class InvalidCredentialsError(BaseError):
    def __init__(self):
        super().__init__(message=INVALID_CREDENTIALS, code=status.HTTP_401_UNAUTHORIZED, identifier="invalid_credentials")


class InvalidPermissionsError(BaseError):
    def __init__(self):
        super().__init__(message=DONT_HAVE_PERMISSIONS, code=status.HTTP_403_FORBIDDEN, identifier="invalid_permissions")


class UserNotLoggedError(BaseError):
    def __init__(self):
        super().__init__(message=HAVENT_LOGGED_IN, code=status.HTTP_401_UNAUTHORIZED, identifier="user_not_logged_in")


class UserNotFoundError(BaseError):
    def __init__(self):
        super().__init__(message=USER_NOT_FOUND, code=status.HTTP_404_NOT_FOUND, identifier="user_not_found")


class InvalidLanguageError(BaseError):
    def __init__(self):
        super().__init__(message=LANGUAGE_NOT_SUPPORTED, code=status.HTTP_400_BAD_REQUEST, identifier="invalid_language")
