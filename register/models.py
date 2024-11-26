from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    cedulaCliente = models.CharField(max_length=10, unique=True, verbose_name=_("Cédula de Cliente"))
    nombreCliente = models.CharField(max_length=100, verbose_name=_("Nombre del Cliente"))
    apellidoCliente = models.CharField(max_length=100, verbose_name=_("Apellido del Cliente"))
    nacionalidadCliente = models.CharField(max_length=60, verbose_name=_("Nacionalidad del Cliente"))
    fechaRegistroCliente = models.DateField(auto_now_add=True, verbose_name=_("Fecha de Registro"))
    telefonoCliente = models.CharField(max_length=16, verbose_name=_("Teléfono del Cliente"))
    correoCliente = models.EmailField(max_length=100, unique=True, verbose_name=_("Correo Electrónico del Cliente"))
    genero = models.CharField(max_length=50, choices=[('masculino', _('Masculino')), ('femenino', _('Femenino')), ('otro', _('Otro'))], verbose_name=_("Género"))
    rol = models.CharField(max_length=50, default='Cliente')

    def __str__(self):
        return f"{self.nombreCliente} {self.apellidoCliente} ({self.rol})"
