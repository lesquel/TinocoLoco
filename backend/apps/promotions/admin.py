from django.contrib import admin

# Register your models here.
from .models import Promotion, PromotionCategory


class PromotionAdmin(admin.ModelAdmin):
    list_display = ['promotion_name', 'promotion_category', 'valid_from', 'valid_until', 'creation_date']
    search_fields = ['promotion_name', 'promotion_category']
    list_filter = ['promotion_category', 'valid_from', 'valid_until', 'creation_date']


class PromotionCategoryAdmin(admin.ModelAdmin):
    list_display = ['promotion_category_name', 'promotion_category_description', 'creation_date']
    search_fields = ['promotion_category_name', ]
    list_filter = ['creation_date', ]

admin.site.register(Promotion, PromotionAdmin)
admin.site.register(PromotionCategory, PromotionCategoryAdmin)
