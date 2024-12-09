from rest_framework.response import Response
from rest_framework import status
from functools import wraps

from base.utils import errors


class ErrorHandler:
    def __init__(self, message=None, code=None):
        self.message = message
        self.default_code = code

    def __call__(self, func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)

            except errors.BaseError as e:
                # Maneja errores personalizados
                return self._handle_error(e.args[0], e.code)

            except Exception as e:
                # Maneja excepciones generales
                return self._handle_error(
                    {"error": [str(e)]},
                    self.default_code or status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        return wrapper

    def _handle_error(self, message, code):
        """
        Envía la respuesta con la estructura de error esperada.
        """
        # Garantiza que los mensajes siempre estén en el formato adecuado
        if not isinstance(message, dict):
            message = {"error": [str(message)]}

        error_response = {
            "errors": self.message + ": " + str(message) if self.message else message,
            "code": code,
        }
        return Response(error_response, status=code)