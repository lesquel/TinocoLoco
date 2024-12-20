from django.contrib import admin

from .models import Service, ServiceCategory
# Register your models here.

class ServiceAdmin(admin.ModelAdmin):
    list_display = ("id",'service_name', 'service_unitary_cost', 'service_category',"creation_date")
    list_filter = ('service_category', "creation_date")
    
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("id",'service_category_name', 'service_category_description',"creation_date")
    list_filter = ("creation_date",)


admin.site.register(Service, ServiceAdmin)
admin.site.register(ServiceCategory, ServiceCategoryAdmin)