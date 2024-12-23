from django.contrib import admin

from apps.reviews.admin import ReviewInline
from apps.photos.admin import PhotoInline

from .models import Service, ServiceCategory
# Register your models here.

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("id",'service_name', 'service_unitary_cost', 'service_category',"creation_date")
    list_filter = ('service_category', "creation_date")
    inlines = [ReviewInline, PhotoInline]

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("id",'service_category_name', 'service_category_description',"creation_date")
    list_filter = ("creation_date",)

