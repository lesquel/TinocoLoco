from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from apps.reviews.admin import ReviewInline
from apps.photos.admin import PhotoInline
from .models import Service, ServiceCategory


# Define un recurso para el modelo Service
class ServiceResource(resources.ModelResource):
    class Meta:
        model = Service
        fields = (
            "id",
            "service_name",
            "service_unitary_cost",
            "service_category__service_category_name",
            "creation_date",
        )
        export_order = (
            "id",
            "service_name",
            "service_unitary_cost",
            "service_category__service_category_name",
            "creation_date",
        )


# Define un recurso para el modelo ServiceCategory
class ServiceCategoryResource(resources.ModelResource):
    class Meta:
        model = ServiceCategory
        fields = (
            "id",
            "service_category_name",
            "service_category_description",
            "creation_date",
        )
        export_order = (
            "id",
            "service_category_name",
            "service_category_description",
            "creation_date",
        )


# Admin para el modelo Service
@admin.register(Service)
class ServiceAdmin(ImportExportModelAdmin):
    resource_class = ServiceResource
    search_fields = ("service_name", "service_category__service_category_name")
    list_display = ("id", "service_name", "service_unitary_cost", "service_category", "creation_date")
    list_filter = ("service_category", "creation_date")
    inlines = [ReviewInline, PhotoInline]


# Admin para el modelo ServiceCategory
@admin.register(ServiceCategory)
class ServiceCategoryAdmin(ImportExportModelAdmin):
    resource_class = ServiceCategoryResource
    search_fields = ("service_category_name", "service_category_description")
    list_display = ("id", "service_category_name", "service_category_description", "creation_date")
    list_filter = ("creation_date",)
