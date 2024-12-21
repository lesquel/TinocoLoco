from django.utils.translation import gettext_lazy as _

ERROR_MESSAGES = {
    "INVALID_STATUS": _("Estado de alquiler inválido"),
    "INVALID_START_END_DATE": _("La fecha de inicio no puede ser mayor que la fecha de fin"),
    "SERVICE_NOT_FOUND": _("El servicio no existe."),
    "AMOUNT_MUST_BE_GREATER_THAN_ZERO": _("La cantidad de servicios debe ser mayor a 0."),
    "INVALID_DELIVERY_DATE": _("La fecha de entrega no puede ser menor a la fecha del evento."),
    "EVENT_RENTAL_ALREADY_HAS_SERVICE": _("El evento ya tiene asociado el servicio."),
}