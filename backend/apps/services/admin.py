from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

from apps.reviews.models import Review
from apps.photos.models import Photo

from .models import Service, ServiceCategory
# Register your models here.

class ReviewInline(GenericTabularInline):
    model = Review
    extra = 0
    

class PhotoInline(GenericTabularInline):
    model = Photo
    extra = 0

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("id",'service_name', 'service_unitary_cost', 'service_category',"creation_date")
    list_filter = ('service_category', "creation_date")
    inlines = [ReviewInline, PhotoInline]

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("id",'service_category_name', 'service_category_description',"creation_date")
    list_filter = ("creation_date",)

