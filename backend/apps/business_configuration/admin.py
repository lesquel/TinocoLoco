from django.contrib import admin
from .models import BusinessConfiguration

@admin.register(BusinessConfiguration)
class BusinessConfigurationAdmin(admin.ModelAdmin):
    list_display = ["business_name", "business_email", "business_phone_number"]
    search_fields = ["business_name", "business_email", "business_phone_number"]

