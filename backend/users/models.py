from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from users.choices import SexChoices, RoleChoices, LanguageChoices


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
        extra_fields.setdefault("role", RoleChoices.ADMIN.value)
        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):

    identity_card = models.CharField(
        max_length=10,
        unique=True,
        blank=True,
        null=True,
    )
    username = models.CharField(
        max_length=30,
        unique=True,
    )
    nacionality = models.CharField(
        max_length=20,
        blank=True,
        null=True,
    )
    email = models.EmailField(
        unique=True,
    )
    first_name = models.CharField(
        max_length=30,
        blank=True,
        null=True,
    )
    last_name = models.CharField(
        max_length=30,
        blank=True,
        null=True,
    )
    password = models.CharField(
        max_length=128,
    )
    sex = models.CharField(
        max_length=1,
        blank=True,
        null=True,
        choices=SexChoices.choices,
    )

    preferred_language = models.CharField(
        max_length=2,
        choices=LanguageChoices.choices,
        default=LanguageChoices.ENGLISH.value,
    )

    role = models.CharField(
        max_length=20, choices=RoleChoices.choices, default=RoleChoices.COSTUMER.value
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def save(self, *args, **kwargs):

        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
