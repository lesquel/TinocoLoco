from rest_framework import status

from django.utils.translation import gettext as _


HAVENT_LOGGED_IN = _("No ha iniciado sesión")
LANGUAGE_NOT_SUPORTED = _("Idioma no soportado")
INVALID_CREDENTIALS = _("Credenciales inválidas")
DONT_HAVE_PERMISSIONS = _("No tiene permisos para realizar esta acción")
USER_NOT_FOUND = _("Usuario no encontrado")
INVALID_ROLE= _("Rol inválido")
MUST_PROVIDE_BOTH_EMAIL_AND_PASSWORD = _("Por favor, ingresar su usuario y contraseña")


class BaseError(Exception):
    def __init__(self, message=None, code=None):
        super().__init__(self._serialize_errors(message))
        self.code = code or status.HTTP_500_INTERNAL_SERVER_ERROR

    def _serialize_errors(self, errors):
        if isinstance(errors, list):
            return {"error": [str(e) for e in errors]}

        if isinstance(errors, dict):
            serialized = {}
            for key, error_list in errors.items():
                serialized[key] = [str(e) for e in error_list]
            return serialized

        # Si el error es un string o cualquier otro tipo, conviértelo en un diccionario
        return {"error": [str(errors)]}




class ValidationError(BaseError):
    def __init__(self, message):
        super().__init__(message, status.HTTP_400_BAD_REQUEST)


class InvalidRoleError(BaseError):
    def __init__(self):
        super().__init__(INVALID_ROLE, status.HTTP_400_BAD_REQUEST)


class MissingFieldsLoginError(BaseError):
    def __init__(
        self,
    ):
        super().__init__(
            MUST_PROVIDE_BOTH_EMAIL_AND_PASSWORD, status.HTTP_400_BAD_REQUEST
        )


class InvalidCredentialsError(BaseError):
    def __init__(self):
        super().__init__(INVALID_CREDENTIALS, status.HTTP_401_UNAUTHORIZED)


class InvalidPermissionsError(BaseError):
    def __init__(self):
        super().__init__(DONT_HAVE_PERMISSIONS, status.HTTP_403_FORBIDDEN)


class UserNotLoggedError(BaseError):
    def __init__(self):
        super().__init__(HAVENT_LOGGED_IN, status.HTTP_401_UNAUTHORIZED)


class UserNotFoundError(BaseError):
    def __init__(self):
        super().__init__(USER_NOT_FOUND, status.HTTP_404_NOT_FOUND)


class InvalidLanguage(BaseError):
    def __init__(self):
        super().__init__(LANGUAGE_NOT_SUPORTED, status.HTTP_400_BAD_REQUEST)
