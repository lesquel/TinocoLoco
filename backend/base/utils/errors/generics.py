from rest_framework import status
from .baseError import BaseError

class ValidationError(BaseError):
    def __init__(self, message, identifier=None):
        super().__init__(message, status.HTTP_400_BAD_REQUEST, identifier)
