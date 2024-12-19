from django.http import JsonResponse
from rest_framework import status
from base.utils import errors


class ErrorHandlerMiddleware:


    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_exception(self, request, exception):
        if isinstance(exception, errors.BaseError):
            identifier = getattr(exception, "identifier", "unknown_error")
            return self._handle_error(exception.args[0], exception.code, identifier)
    
        return self._handle_error(
            {"internal_server_error": [str(exception)]},
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            "internal_server_error",
        )

    def _handle_error(self, message, code, identifier="error"):
        if not isinstance(message, dict):
            message = {identifier: [str(message)]}

        error_response = {
            "errors": message,
            "code": code,
        }
        return JsonResponse(error_response, status=code)
