from django.utils.translation import gettext as _
from rest_framework import status
from .baseError import BaseError

NOT_FOUND = _("Not found")

class NotFoundError(BaseError):
    def __init__(self, message=NOT_FOUND, identifier="not_found"):
        super().__init__(message=message, code=status.HTTP_404_NOT_FOUND, identifier=identifier)