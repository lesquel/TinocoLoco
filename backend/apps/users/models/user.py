from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils.crypto import get_random_string

from ..choices import SexChoices, RoleChoices, LanguageChoices
from ..messages import VARIABLE_NAMES_USER


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save()  
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", RoleChoices.ADMIN.value)
        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    class Meta:
        verbose_name = VARIABLE_NAMES_USER["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_USER["META_VERBOSE_NAME_PLURAL"]

    identity_card = models.CharField(
        unique=True,
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_USER["IDENTITY_CARD"],
    )
    first_name = models.CharField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_USER["FIRST_NAME"],
    )
    last_name = models.CharField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_USER["LAST_NAME"],
    )
    username = models.CharField(
        unique=True,
        verbose_name=VARIABLE_NAMES_USER["USERNAME"],
    )
    nationality = models.CharField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_USER["NACIONALITY"],
    )
    email = models.EmailField(
        unique=True,
        verbose_name=VARIABLE_NAMES_USER["EMAIL"],
    )
    email_verified = models.BooleanField(
        default=False,
        verbose_name=VARIABLE_NAMES_USER["EMAIL_VERIFIED"],
    )
    email_verification_code = models.CharField(
        blank=True,
        null=True,
        verbose_name=VARIABLE_NAMES_USER["EMAIL_VERIFICATION_CODE"],
    )
    password = models.CharField(
        verbose_name=VARIABLE_NAMES_USER["PASSWORD"],
    )
    sex = models.CharField(
        blank=True,
        null=True,
        choices=SexChoices.choices,
        verbose_name=VARIABLE_NAMES_USER["SEX"],
    )
    preferred_language = models.CharField(
        choices=LanguageChoices.choices,
        default=LanguageChoices.SPANISH.value,
        verbose_name=VARIABLE_NAMES_USER["PREFERRED_LANGUAGE"],
    )
    role = models.CharField(
        choices=RoleChoices.choices,
        default=RoleChoices.COSTUMER.value,
        verbose_name=VARIABLE_NAMES_USER["ROLE"],
    )
    date_joined = models.DateTimeField(
        auto_now_add=True,
        verbose_name=VARIABLE_NAMES_USER["DATE_JOINED"],
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=VARIABLE_NAMES_USER["IS_ACTIVE"],
    )
    is_staff = models.BooleanField(
        default=False,
        verbose_name=VARIABLE_NAMES_USER["IS_STAFF"],
    )
    is_superuser = models.BooleanField(
        default=False,
        verbose_name=VARIABLE_NAMES_USER["IS_SUPERUSER"],
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username

    def generate_verification_code(self):
        self.email_verification_code = get_random_string(length=6)
        self.save()
        return self.email_verification_code

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}" if self.first_name else ""

    
    @property
    def has_completed_profile(self):
        required_fields = [
            self.identity_card,
            self.first_name,
            self.nationality,
            self.sex,
        ]
        return all(field for field in required_fields)
