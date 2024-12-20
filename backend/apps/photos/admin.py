from django.contrib import admin

# Register your models here.
from .models import Photo

class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id','content_type', 'object_id', 'content_object', 'image')
    list_display_links = ('id', 'content_type', 'object_id', 'content_object')

admin.site.register(Photo, PhotoAdmin)