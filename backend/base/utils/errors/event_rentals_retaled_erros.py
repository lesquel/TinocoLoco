from rest_framework import status
from .baseError import BaseError
from django.utils.translation import gettext_lazy as _


ALREADY_CONFIRMED = _("Este alquiler ya ha sido confirmado")
MIN_ATTENDEES_CANNOT_BE_GREATER_THAN_MAX_ATTENDEES = _(
    "El numero de asistentes minimo no puede ser mayor al numero de asistentes maximo"
)
VALUE_CANCELLATION_IN_ADVANCE_MUST_BE_GREATER_THAN_ZERO = _(
    "El valor de cancelacion debe ser mayor a 0"
)
EVENT_RENTAL_DATE_CANNOT_BE_LESS_THAN_TODAY = _(
    "La fecha del alquiler no puede ser menor a la fecha actual"
)
EVENT_RENTAL_MUST_BE_AT_LEAST_THREE_DAYS_IN_ADVANCE = _(
    "El alquiler debe ser al menos con tres dias de anticipacion"
)


class InvalidMinAttendeesError(BaseError):
    def __init__(
        self,
        message=MIN_ATTENDEES_CANNOT_BE_GREATER_THAN_MAX_ATTENDEES,
        identifier="event_rental_min_attendees",
    ):
        super().__init__(
            message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier
        )


class AlreadyConfirmedError(BaseError):
    def __init__(self, message=ALREADY_CONFIRMED, identifier="current_status"):
        super().__init__(
            message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier
        )


class ValueCancellationInAdvanceMustBeGreaterThanZeroError(BaseError):
    def __init__(
        self,
        message=VALUE_CANCELLATION_IN_ADVANCE_MUST_BE_GREATER_THAN_ZERO,
        identifier="event_rental_cancelled_value_in_advance",
    ):
        super().__init__(
            message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier
        )


class EventRentalDateCannotBeLessThanTodayError(BaseError):
    def __init__(
        self,
        message=EVENT_RENTAL_DATE_CANNOT_BE_LESS_THAN_TODAY,
        identifier="event_rental_date",
    ):
        super().__init__(
            message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier
        )


class EventRentalDateMustBeAtLeastThreeDaysInAdvanceError(BaseError):
    def __init__(
        self,
        message=EVENT_RENTAL_MUST_BE_AT_LEAST_THREE_DAYS_IN_ADVANCE,
        identifier="event_rental_date",
    ):
        super().__init__(
            message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier
        )
