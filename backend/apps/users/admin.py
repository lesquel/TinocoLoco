from django.contrib import admin
from .models import CustomUser, PasswordResetCode
# Register your models here.

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ["username",'email', 'first_name', 'last_name', 'is_active', 'is_superuser', 'date_joined']
    search_fields = ["identity_card",'email', 'first_name', 'last_name']
    list_filter = ['is_active', 'is_superuser', "sex"]

    class Meta:
        model = CustomUser

class PasswordResetCodeAdmin(admin.ModelAdmin):
    list_display = ['user', 'code', 'created_at']
    search_fields = ['user', 'code']
    list_filter = ['created_at']

    class Meta:
        model = PasswordResetCode


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(PasswordResetCode, PasswordResetCodeAdmin)
