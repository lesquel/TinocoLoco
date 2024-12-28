from .baseError import BaseError
from rest_framework import status
from django.utils.translation import gettext_lazy as _

REFERENCE_VALUE_ERROR = _("El valor de referencia debe ser mayor a 0")
EXTRA_HOUR_RATE_ERROR = _("La tarifa por hora extra debe ser mayor a 0 ")
ALLOWED_HOURS_ERROR = _("Las horas permitidas deben ser mayores a 0")


class EventReferenceValueError(BaseError):
    def __init__(self):
        super().__init__(
            message=REFERENCE_VALUE_ERROR,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="event_reference_value",
        )


class EventExtraHourRateError(BaseError):
    def __init__(self):
        super().__init__(
            message=EXTRA_HOUR_RATE_ERROR,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="event_extra_hour_rate",
        )


class EventAllowedHoursError(BaseError):
    def __init__(self):
        super().__init__(
            message=ALLOWED_HOURS_ERROR,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="event_allowed_hours",
        )
