from django.contrib import admin

# Register your models here.
from .models import Promotion, PromotionCategory

admin.site.register(Promotion)
admin.site.register(PromotionCategory)