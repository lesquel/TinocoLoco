from django.contrib import admin

# Register your models here.
from .models import Contingency, ContingencyCategory

admin.site.register(Contingency)
admin.site.register(ContingencyCategory)