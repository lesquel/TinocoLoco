from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

# Register your models here.
from .models import Photo
from base.mixins import ImagePreviewMixin

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin, ImagePreviewMixin):
    list_display = ('id','content_type', 'object_id', 'content_object', 'image_preview')
    list_display_links = ('id', 'content_type', 'object_id', 'content_object')
    
    
class PhotoInline(GenericTabularInline, ImagePreviewMixin):
    model = Photo

    extra = 0
    fields = ['image', 'image_preview']
    readonly_fields = ['image_preview'] 