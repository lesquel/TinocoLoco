from rest_framework import status
from .baseError import BaseError
from django.utils.translation import gettext_lazy as _

# Translated error messages
INVALID_ROLE = _("Rol inválido")
MUST_PROVIDE_BOTH_EMAIL_AND_PASSWORD = _("Por favor, ingresar su usuario y contraseña")
INVALID_CREDENTIALS = _("Credenciales inválidas")
DONT_HAVE_PERMISSIONS = _("No tiene permisos para realizar esta acción")
HAVENT_LOGGED_IN = _("No ha iniciado sesión")
USER_NOT_FOUND = _("Usuario no encontrado")
LANGUAGE_NOT_SUPPORTED = _("Idioma no soportado")
USERNAME_ALREADY_EXISTS= _("Este nombre de usuario ya está en uso.")
IDENTITY_CARD_ALREADY_EXISTS= _("Este número de cédula ya está registrado.")
EMAIL_ALREADY_EXISTS = _("Este correo electrónico ya está registrado")
EMAIL_ALREADY_EXISTS= _("Este correo electrónico ya está registrado.")


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


class UsernameAlreadyExistsError(BaseError):
    def __init__(self):
        super().__init__(message=USERNAME_ALREADY_EXISTS, code=status.HTTP_400_BAD_REQUEST, identifier="username")
        
class IdentityCardAlreadyExistsError(BaseError):
    def __init__(self):
        super().__init__(message=IDENTITY_CARD_ALREADY_EXISTS, code=status.HTTP_400_BAD_REQUEST, identifier="identity_card")
        
class EmailAlreadyExistsError(BaseError):
    def __init__(self):
        super().__init__(message=EMAIL_ALREADY_EXISTS, code=status.HTTP_400_BAD_REQUEST, identifier="email")
