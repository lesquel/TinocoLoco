from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from .models import Promotion, PromotionCategory


class PromotionResource(resources.ModelResource):
    class Meta:
        model = Promotion
        fields = (
            "id",
            "promotion_name",
            "promotion_category__promotion_category_name",
            "valid_from",
            "valid_until",
            "creation_date",
        )
        export_order = (
            "id",
            "promotion_name",
            "promotion_category__promotion_category_name",
            "valid_from",
            "valid_until",
            "creation_date",
        )


class PromotionCategoryResource(resources.ModelResource):
    class Meta:
        model = PromotionCategory
        fields = (
            "id",
            "promotion_category_name",
            "promotion_category_description",
            "creation_date",
        )
        export_order = (
            "id",
            "promotion_category_name",
            "promotion_category_description",
            "creation_date",
        )


@admin.register(Promotion)
class PromotionAdmin(ImportExportModelAdmin):
    resource_class = PromotionResource
    list_display = [
        "promotion_name",
        "promotion_category",
        "valid_from",
        "valid_until",
        "creation_date",
    ]
    search_fields = ["promotion_name", "promotion_category__promotion_category_name"]
    list_filter = ["promotion_category", "valid_from", "valid_until", "creation_date"]


@admin.register(PromotionCategory)
class PromotionCategoryAdmin(ImportExportModelAdmin):
    resource_class = PromotionCategoryResource
    list_display = [
        "promotion_category_name",
        "promotion_category_description",
        "creation_date",
    ]
    search_fields = ["promotion_category_name"]
    list_filter = ["creation_date"]
