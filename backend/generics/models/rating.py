from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from user.models import CustomUser


class Rating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    rating_score = models.PositiveIntegerField(choices=[(i, i) for i in range(0, 6)])
    rating_comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("content_type", "object_id", "user")
    
    def __str__(self):
        return f"Rating of {self.rating_score} by {self.user} on {self.content_object}"
