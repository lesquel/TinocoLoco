from django.contrib import admin

# Register your models here.
from .models import Picture, Rating

admin.site.register(Picture)
admin.site.register(Rating)


