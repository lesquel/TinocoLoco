from django.contrib import admin

# Register your models here.
from .models import Contingency

class ContingencyAdmin(admin.ModelAdmin):
    list_display = (
        "event_rental",
        "contingency_impact_level",
        "contingency_category",
        "contingency_penalty_amount",
        "contingency_date_occurred",
    )
    list_filter = (
        "contingency_impact_level",
        "contingency_category",
        "contingency_date_occurred",
    )
    search_fields = (
        "event_rental",
        "contingency_description",
    )

admin.site.register(Contingency, ContingencyAdmin)