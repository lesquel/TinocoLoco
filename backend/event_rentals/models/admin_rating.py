from django.db import models
from users.models import CustomUser

class AdminRating(models.Model):
    rental = models.OneToOneField('EventRental', on_delete=models.CASCADE, related_name="admin_rating")
    admin_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    rating_score = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)])  # Calificación de 1 a 5
    rating_comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Admin Rating {self.rating_score} for Rental {self.rental}"
