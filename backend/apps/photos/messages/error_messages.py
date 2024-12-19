from django.utils.translation import gettext_lazy as _

ERROR_MESSAGES = {
    "MUST_PROVIDE_IMAGE": _("Por favor, subir una imagen."),
    'REQUIRED_FIELDS_ERROR' : _("El tipo de contenido y el id del objeto son requeridos."),
    'INVALID_CONTENT_TYPE' : _("El tipo de contenido no es válido."),
    'PHOTO_ASSOCIATION_ERROR' : _("Foto no puede ser asociada con {}."),
}