from django.db import models


class Product(models.Model):
    visualizations = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    creation_date = models.DateField(auto_now_add=True)
    last_actualization_date = models.DateField(auto_now=True)

    class Meta:
        abstract = True

    def increment_visualizations(self):
        self.visualizations += 1
        self.save()


