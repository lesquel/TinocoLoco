from django.contrib import admin

# Register your models here.
from .models import Promotion, PromotionCategory

@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ['promotion_name', 'promotion_category', 'valid_from', 'valid_until', 'creation_date']
    search_fields = ['promotion_name', 'promotion_category']
    list_filter = ['promotion_category', 'valid_from', 'valid_until', 'creation_date']

@admin.register(PromotionCategory)
class PromotionCategoryAdmin(admin.ModelAdmin):
    list_display = ['promotion_category_name', 'promotion_category_description', 'creation_date']
    search_fields = ['promotion_category_name', ]
    list_filter = ['creation_date', ]
