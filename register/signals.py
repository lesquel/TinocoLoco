# register/signals.py
from django.db.models.signals import post_migrate
from django.contrib.auth.models import Group

def create_groups(sender, **kwargs):
    # Crear los grupos si no existen
    if not Group.objects.filter(name='Cliente').exists():
        Group.objects.create(name='Cliente')
    if not Group.objects.filter(name='Empleado').exists():
        Group.objects.create(name='Empleado')

# Conectar la señal después de que las apps se hayan cargado
post_migrate.connect(create_groups)
