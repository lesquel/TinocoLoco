from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from import_export import resources
from import_export.admin import ImportExportModelAdmin

# Register your models here.
from .models import Review


# Recurso para el modelo Review
class ReviewResource(resources.ModelResource):
    class Meta:
        model = Review
        fields = (
            "id",
            "owner",
            "content_object",
            "content_type__model",
            "object_id",
            "rating_score",
            "created_at",
        )
        export_order = (
            "id",
            "owner",
            "content_object",
            "content_type__model",
            "object_id",
            "rating_score",
            "created_at",
        )


# Inline genérico para Review
class ReviewInline(GenericTabularInline):
    model = Review
    extra = 0


# Admin para el modelo Review con import-export
@admin.register(Review)
class ReviewAdmin(ImportExportModelAdmin):
    resource_class = ReviewResource
    list_display = ("id", "owner", "content_object", "content_type", "rating_score")
    list_display_links = ("id", "owner", "content_object")
    search_fields = ("created_at",)
    list_per_page = 25
