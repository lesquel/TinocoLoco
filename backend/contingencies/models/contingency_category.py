from django.db import models

class ContingencyCategory(models.Model):
    contingency_category_name = models.CharField(max_length=50)
    contingency_category_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.contingency_category_name