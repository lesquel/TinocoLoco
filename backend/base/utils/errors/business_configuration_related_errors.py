from .baseError import BaseError

from django.utils.translation import gettext_lazy as _
from rest_framework import status

CONFIGURATION_NOT_FOUND_ERROR = _("Configuración del negocio no encontrada.")
ONLY_ONE_CONFIGURATION_ERROR = _("Solo puede haber una configuración de negocio.")


class ConfigurationNotFoundError(BaseError):
    def __init__(self):
        super().__init__(
            message=CONFIGURATION_NOT_FOUND_ERROR,
            code=status.HTTP_404_NOT_FOUND,
            identifier="config_not_found",
        )


class ConfigurationAlreadyExistsError(BaseError):
    def __init__(self):
        super().__init__(
            message=ONLY_ONE_CONFIGURATION_ERROR,
            code=status.HTTP_400_BAD_REQUEST,
            identifier="config_already_exists",
        )
