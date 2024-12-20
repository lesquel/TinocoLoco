from django.contrib import admin
from .models import BusinessConfiguration

class BusinessConfigurationAdmin(admin.ModelAdmin):
    list_display = ["business_name", "business_email", "business_phone_number"]
    search_fields = ["business_name", "business_email", "business_phone_number"]

admin.site.register(BusinessConfiguration, BusinessConfigurationAdmin)
