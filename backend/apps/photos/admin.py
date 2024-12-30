from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from .models import Photo
from base.mixins import ImagePreviewMixin


class PhotoResource(resources.ModelResource):
    class Meta:
        model = Photo
        fields = (
            "id",
            "content_type__model",
            "object_id",
            "content_object",
            "image",
            "created_at",
        )
        export_order = (
            "id",
            "content_type__model",
            "object_id",
            "content_object",
            "image",
            "created_at",
        )


@admin.register(Photo)
class PhotoAdmin(ImportExportModelAdmin, ImagePreviewMixin):
    resource_class = PhotoResource
    list_display = (
        "id",
        "content_type",
        "object_id",
        "content_object",
        "image_preview",
    )
    list_display_links = ("id", "content_type", "object_id", "content_object")


class PhotoInline(GenericTabularInline, ImagePreviewMixin):
    model = Photo
    extra = 0
    fields = ["image", "image_preview"]
    readonly_fields = ["image_preview"]
