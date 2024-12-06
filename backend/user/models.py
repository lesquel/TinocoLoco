from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils.translation import gettext as _
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token
CLIENT_ROLE = _("Cliente")
BUSINESS_OWNER_ROLE = _("Dueño de Negocio")
ADMIN_ROLE = _("Administrador")



# Verbose name para los campos
IDENTITY_CARD_VERBOSE = _("Cédula")
EMAIL_VERBOSE = _("Correo electrónico")
FIRST_NAME_VERBOSE = _("Nombre")
LAST_NAME_VERBOSE = _("Apellido")
PASSWORD_VERBOSE = _("Contraseña")
USERNAME_VERBOSE = _("Nombre de Usuario")
NATIONALITY_VERBOSE = _("Nacionalidad")
DATE_JOINED_VERBOSE = _("Fecha de Registro")
PHONE_NUMBER_VERBOSE = _("Teléfono")
ADDRESS_VERBOSE = _("Dirección")
ROLE_VERBOSE = _("Rol")
SEX_VERBOSE = _("Sexo")

MALE = _("Masculino")
FEAMALE = _("Femenino")

ENGLISH = _("Inglés")
SPANISH = _("Español")

LANGUAGE_VERBOSE = _("Idioma")

IS_ACTIVE_VERBOSE = _("Activo")
IS_STAFF_VERBOSE = _("Staff")


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ("client", CLIENT_ROLE),
        ("business_owner", BUSINESS_OWNER_ROLE),
        ("admin", ADMIN_ROLE),
    )
    SEX_CHOICES = (("M", MALE), ("F", FEAMALE))

    LANGUAGE_CHOICES = (("es", SPANISH), ("en", ENGLISH))

    identity_card = models.CharField(
        max_length=10,
        unique=True,
        blank=True,
        null=True,
        verbose_name=IDENTITY_CARD_VERBOSE,
    )
    username = models.CharField(
        max_length=30, unique=True, verbose_name=USERNAME_VERBOSE
    )
    nacionality = models.CharField(
        max_length=20, blank=True, null=True, verbose_name=NATIONALITY_VERBOSE
    )
    email = models.EmailField(unique=True, verbose_name=EMAIL_VERBOSE)
    first_name = models.CharField(
        max_length=30, blank=True, null=True, verbose_name=FIRST_NAME_VERBOSE
    )
    last_name = models.CharField(
        max_length=30, blank=True, null=True, verbose_name=LAST_NAME_VERBOSE
    )
    password = models.CharField(max_length=128, verbose_name=PASSWORD_VERBOSE)
    sex = models.CharField(
        max_length=1,
        blank=True,
        null=True,
        choices=(("M", MALE), ("F", FEAMALE)),
        verbose_name=SEX_VERBOSE,
    )

    preferred_language = models.CharField(
        max_length=2, choices=LANGUAGE_CHOICES, default="es", verbose_name=LANGUAGE_VERBOSE
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="client")
    
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"] 
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
