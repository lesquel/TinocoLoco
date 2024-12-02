from django.contrib import admin
from .models import BusinessConfiguration


admin.site.register(BusinessConfiguration)
# @admin.register(ConfigurationBusiness)
# class ConfigurationBusinessAdmin(admin.ModelAdmin):
#     def has_add_permission(self, request):
#         if ConfigurationBusiness.objects.exists():
#             return False
#         return super().has_add_permission(request)
