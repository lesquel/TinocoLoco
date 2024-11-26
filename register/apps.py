from django.apps import AppConfig

class RegisterConfig(AppConfig):
    name = 'register'

    def ready(self):
        # Retrasar la conexión de la señal
        import register.signals
