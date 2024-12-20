from django.utils.translation import gettext_lazy as _

VARIABLE_NAMES_EVENT_RENTAL_SERVICES = {
    "EVENT_RENTAL": _("Alquiler de evento"),
    "SERVICE": _("Servicio"),
    "SERVICE_QUANTITY": _("Cantidad del servicio"),
    "STATUS": _("Estado"),
    "DATE_TO_DELIVER": _("Fecha de entrega"),
    "DESCRIPTION": _("Descripción"),
    "SERVICE_OBSERVATION": _("Observación del servicio"),
    "META_VERBOSE_NAME": _("Servicio de alquiler de evento"),
    "META_VERBOSE_NAME_PLURAL": _("Servicios de alquiler de evento")
}


VARIABLE_NAMES_EVENT_RENTAL = {
    "EVENT": _("Evento"),
    "OWNER": _("Propietario"),
    "EVENT_RENTAL_DATE": _("Fecha de alquiler del evento"),
    "EVENT_RENTAL_START_TIME": _("Hora de inicio del alquiler"),
    "EVENT_RENTAL_PLANIFIED_END_TIME": _("Hora de fin planificada del alquiler"),
    "EVENT_RENTAL_END_TIME": _("Hora de fin del alquiler"),
    "EVENT_RENTAL_COST": _("Costo del alquiler"),
    "EVENT_RENTAL_CANCELLED_VALUE_IN_ADVANCE": _("Valor cancelado por adelantado del alquiler"),
    "EVENT_RENTAL_PAYMENT_METHOD": _("Método de pago del alquiler"),
    "EVENT_RENTAL_OBSERVATION": _("Observación del alquiler"),
    "EVENT_RENTAL_MIN_ATTENDEES": _("Mínimo de asistentes al alquiler"),
    "EVENT_RENTAL_MAX_ATTENDEES": _("Máximo de asistentes al alquiler"),
    "EVENT_RENTAL_CREATION_DATE": _("Fecha de creación del alquiler"),
    "PROMOTIONS": _("Promociones"),
    "VIEW_COUNT": _("Contador de vistas"),
    "OWNER_RATING": _("Calificación del propietario"),
    "COSTUMER_RATING": _("Calificación del cliente"),
    "CURRENT_STATUS": _("Estado actual"),
    "CONFIRMATION_CODE": _("Código de confirmación"),
    "META_VERBOSE_NAME": _("Alquiler de evento"),
    "META_VERBOSE_NAME_PLURAL": _("Alquileres de evento"),
}





VARIABLE_NAMES_RENTAL_STATUS_HISTORY = {
    "RENTAL": _("Alquiler"),
    "CHANGED_BY": _("Cambiado por"),
    "STATUS": _("Estado"),
    "REASON": _("Razón"),
    "CREATED_AT": _("Fecha de cambio"),
    "META_VERBOSE_NAME": _("Historial de estado del alquiler"),
    "META_VERBOSE_NAME_PLURAL": _("Historial de estado de alquileres"),
}
