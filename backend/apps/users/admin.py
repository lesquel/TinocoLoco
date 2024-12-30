from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import CustomUser, PasswordResetCode


# Define un recurso para CustomUser
class CustomUserResource(resources.ModelResource):
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "identity_card",
            "email_verified",
            "has_completed_profile",
            "is_superuser",
            "is_active",
            "sex",
            "date_joined",
        )
        export_order = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "identity_card",
            "email_verified",
            "has_completed_profile",
            "is_superuser",
            "is_active",
            "sex",
            "date_joined",
        )


# Define un recurso para PasswordResetCode
class PasswordResetCodeResource(resources.ModelResource):
    class Meta:
        model = PasswordResetCode
        fields = ("id", "user__username", "code", "created_at")
        export_order = ("id", "user__username", "code", "created_at")


# Registra CustomUser con import-export
@admin.register(CustomUser)
class CustomUserAdmin(ImportExportModelAdmin):
    resource_class = CustomUserResource
    list_display = [
        "username",
        "email",
        "first_name",
        "last_name",
        "email_verified",
        "has_completed_profile",
        "is_superuser",
        "date_joined",
    ]
    search_fields = ["identity_card", "email", "first_name", "last_name"]
    list_filter = ["is_active", "is_superuser", "sex"]


# Registra PasswordResetCode con import-export
@admin.register(PasswordResetCode)
class PasswordResetCodeAdmin(ImportExportModelAdmin):
    resource_class = PasswordResetCodeResource
    list_display = ["user", "code", "created_at"]
    search_fields = ["user__username", "code"]
    list_filter = ["created_at"]
