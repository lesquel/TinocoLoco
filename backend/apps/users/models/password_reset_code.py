from django.db import models
from django.utils.crypto import get_random_string
from django.utils.timezone import now
from datetime import timedelta
from ..models import CustomUser


class PasswordResetCode(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="reset_codes",
    )
    code = models.CharField(
        max_length=10,
        unique=True,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    is_used = models.BooleanField(
        default=False,
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
