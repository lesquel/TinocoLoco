from django.db import models
from django.utils.crypto import get_random_string
from django.utils.timezone import now
from datetime import timedelta
from ..models import CustomUser

from ..messages import VARIABLE_NAMES_PASSWORD_RESET




class PasswordResetCode(models.Model):
    class Meta:
        verbose_name = VARIABLE_NAMES_PASSWORD_RESET["META_VERBOSE_NAME"]
        verbose_name_plural = VARIABLE_NAMES_PASSWORD_RESET["META_VERBOSE_NAME_PLURAL"]
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="reset_codes",
        verbose_name=VARIABLE_NAMES_PASSWORD_RESET["USER"],
    )
    code = models.CharField(
        max_length=10,
        unique=True,
        verbose_name=VARIABLE_NAMES_PASSWORD_RESET["CODE"],
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=VARIABLE_NAMES_PASSWORD_RESET["CREATED_AT"],
    )
    is_used = models.BooleanField(
        default=False,
        verbose_name=VARIABLE_NAMES_PASSWORD_RESET["IS_USED"],
    )

    @classmethod
    def generate_reset_code(cls, user):
        code = get_random_string(length=10)
        return cls.objects.create(user=user, code=code)

    def is_expired(self):
        expiration_time = self.created_at + timedelta(hours=24)
        return now() > expiration_time

    def __str__(self):
        return f"Reset code for {self.user.email}"

