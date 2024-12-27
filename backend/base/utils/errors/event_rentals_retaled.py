from rest_framework import status
from .baseError import BaseError
from django.utils.translation import gettext_lazy as _


ALREADY_CONFIRMED = _("Este alquiler ya ha sido confirmado")
MIN_ATTENDEES_CANNOT_BE_GREATER_THAN_MAX_ATTENDEES = _("El numero de asistentes minimo no puede ser mayor al numero de asistent")

class InvalidMinAttendeesError(BaseError):
    def __init__(self, message=MIN_ATTENDEES_CANNOT_BE_GREATER_THAN_MAX_ATTENDEES, identifier="event_rental_min_attendees"):
        super().__init__(message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier)
        

class AlreadyConfirmedError(BaseError):
    def __init__(self, message=ALREADY_CONFIRMED, identifier="current_status"):
        super().__init__(message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier)