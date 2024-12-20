from django.contrib import admin
from .models import BusinessConfiguration
from base.mixins import ImagePreviewMixin

@admin.register(BusinessConfiguration)
class BusinessConfigurationAdmin(admin.ModelAdmin,ImagePreviewMixin):
    list_display = ["business_name", "business_email", "business_phone_number", "image_preview"]
    search_fields = ["business_name", "business_email", "business_phone_number", ]

