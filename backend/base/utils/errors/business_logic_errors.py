from django.utils.translation import gettext_lazy as _
from rest_framework import status
from .baseError import BaseError

NOT_FOUND = _("No se encontró el recurso solicitado.")
SERVICE_ID_REQUIRED = _("service_id es obligatorio.")
SERVICE_NOT_ASSOCIATED = _("Este servicio no está asociado con este alquiler de evento.")
MUST_PROVIDE_IMAGE = _("Debe proporcionar al menos una imagen.")

class NotFoundError(BaseError):
    def __init__(self, message=NOT_FOUND, identifier="not_found"):
        super().__init__(message=message, code=status.HTTP_404_NOT_FOUND, identifier=identifier)

class MustProvidePhotoError(BaseError):
    def __init__(self, message=MUST_PROVIDE_IMAGE, identifier="photos"):
        super().__init__(message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier)



class ServiceIdRequiredError(BaseError):
    def __init__(self, message=SERVICE_ID_REQUIRED, identifier="service_id_required"):
        super().__init__(message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier)

class ServiceNotAssociatedError(BaseError):
    def __init__(self, message=SERVICE_NOT_ASSOCIATED, identifier="service_not_associated"):
        super().__init__(message=message, code=status.HTTP_404_NOT_FOUND, identifier=identifier)