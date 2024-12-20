from django.utils.safestring import mark_safe

class ImagePreviewMixin:
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        
        if getattr(obj, "image", None):
            return mark_safe(
                '<img src="{0}" width="150" height="150" style="object-fit:contain" />'.format(
                    obj.image.url  
                )
            )
        elif getattr(obj, "business_logo", None):
            return mark_safe(
                '<img src="{0}" width="150" height="150" style="object-fit:contain" />'.format(
                    obj.business_logo.url  
                )
            )
        else:
            return "(No Preview)"

    image_preview.short_description = "Preview"
