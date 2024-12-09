from django.db import models
from .service_category import ServiceCategory
    

class Service(models.Model):
    service_name = models.CharField(max_length=100)
    service_description = models.CharField(max_length=500)
    service_unitary_cost = models.FloatField()
    service_creation_date = models.DateField(auto_now_add=True)
    services_last_actualization_date = models.DateField(auto_now=True)
    service_vigency = models.BooleanField()

    service_category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE)
    
    
    def __str__(self):
        return self.service_name