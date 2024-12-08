from rest_framework.exceptions import ErrorDetail
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
                return self._handle_error(str(e), e.code)

            except Exception as e:
                return self._handle_error(
                    {"error": str(e)},
                    self.default_code or status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        return wrapper

    def _handle_error(self, message, code):
        """
        Envía la respuesta con la estructura de error esperada.
        """
        error_response = {
            "error": True,
            "message": self.message + ": " + str(message) if self.message else message,
            "code": code,
        }
        return Response(error_response, status=code)
