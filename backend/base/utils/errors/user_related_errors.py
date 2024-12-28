from rest_framework import status
from .baseError import BaseError
from django.utils.translation import gettext_lazy as _

# Translated error messages
INVALID_ROLE = _("Rol inválido")
INVALID_USERNAME_LENGTH = _("El nombre de usuario debe tener entre 5 y 30 caracteres")
MUST_PROVIDE_BOTH_EMAIL_AND_PASSWORD = _("Por favor, ingresar su usuario y contraseña")
INVALID_CREDENTIALS = _("Credenciales inválidas")
INVALID_IDENTITY_CARD = _("Cédula inválida")
IDENTITY_CARD_CANNOT_CONTAIN_LETTERS = _("La cédula no puede contener letras")
IDENTITY_CARD_TOO_LONG = _("La cédula no puede tener más de 10 dígitos")

FIRST_NAME_TOO_LONG = _("El nombre no puede tener más de 30 caracteres")
LAST_NAME_TOO_LONG = _("El apellido no puede tener más de 30 caracteres")
FIRST_NAME_CANNOT_CONTAIN_NUMBERS = _("El nombre no puede contener números")
LAST_NAME_CANNOT_CONTAIN_NUMBERS = _("El apellido no puede contener números")

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


class InvalidUsernameLengthError(BaseError):
    def __init__(self):
        super().__init__(
            message=INVALID_USERNAME_LENGTH,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="username",
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


class FirstNameTooLongError(BaseError):
    def __init__(self):
        super().__init__(
            message=FIRST_NAME_TOO_LONG,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="first_name",
        )


class LastNameTooLongError(BaseError):
    def __init__(self):
        super().__init__(
            message=LAST_NAME_TOO_LONG,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="last_name",
        )


class FirstNameCannotContainNumbersError(BaseError):
    def __init__(self):
        super().__init__(
            message=FIRST_NAME_CANNOT_CONTAIN_NUMBERS,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="first_name",
        )
    
class LastNameCannotContainNumbersError(BaseError):
    def __init__(self):
        super().__init__(
            message=LAST_NAME_CANNOT_CONTAIN_NUMBERS,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="last_name",
        )

class InvalidIdentityCardError(BaseError):
    def __init__(self):
        super().__init__(
            message=INVALID_IDENTITY_CARD,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="identity_card",
        )


class IdentityCardCannotContainLettersError(BaseError):
    def __init__(self):
        super().__init__(
            message=IDENTITY_CARD_CANNOT_CONTAIN_LETTERS,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="identity_card",
        )


class IdentityCardTooLongError(BaseError):
    def __init__(self):
        super().__init__(
            message=IDENTITY_CARD_TOO_LONG,
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
