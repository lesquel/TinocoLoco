from django.contrib import admin

# Register your models here.
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "owner", "content_object", "content_type", "rating_score")
    list_display_links = ("id", "owner", "content_object")
    search_fields = ("created_at",)
    list_per_page = 25
