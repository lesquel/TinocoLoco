from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

# Register your models here.
from .models import Review

class ReviewInline(GenericTabularInline):
    model = Review
    extra = 0


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "owner", "content_object", "content_type", "rating_score")
    list_display_links = ("id", "owner", "content_object")
    search_fields = ("created_at",)
    list_per_page = 25
