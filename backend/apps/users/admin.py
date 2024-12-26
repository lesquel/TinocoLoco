from django.contrib import admin
from .models import CustomUser, PasswordResetCode


# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ["username",'email', 'first_name', 'last_name', 'email_verified','has_completed_profile', 'is_superuser', 'date_joined']
    search_fields = ["identity_card",'email', 'first_name', 'last_name']
    list_filter = ['is_active', 'is_superuser', "sex"]




@admin.register(PasswordResetCode)
class PasswordResetCodeAdmin(admin.ModelAdmin):
    list_display = ['user', 'code', 'created_at']
    search_fields = ['user', 'code']
    list_filter = ['created_at']

