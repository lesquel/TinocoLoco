from django.apps import AppConfig


class EventRentalsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.event_rentals"

    def ready(self):
        import apps.event_rentals.signals