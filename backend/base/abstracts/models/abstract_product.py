from django.db import models


class Product(models.Model):
    view_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    creation_date = models.DateField(auto_now_add=True)
    last_actualization_date = models.DateField(auto_now=True)

    class Meta:
        abstract = True

    def increase_view_count(self):
        self.view_count += 1
        self.save()


