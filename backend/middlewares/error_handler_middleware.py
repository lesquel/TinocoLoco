from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from base.utils import errors


class ErrorHandlerMiddleware:
    """
    Middleware to handle exceptions globally, similar to the provided decorator-based ErrorHandler.
    """

    def __init__(self, get_response):
        self.get_response = get_response  

    def __call__(self, request):
        response = self.get_response(request)
        return response


    def process_exception(self, request, exception):

        if isinstance(exception, errors.BaseError):
            return self._handle_error(exception.args[0], exception.code)
        return self._handle_error(
            {"error": [str(exception)]}, status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        
    def _handle_error(self, message, code):
  
        if not isinstance(message, dict):
            message = {"error": [str(message)]}

        error_response = {
            "errors": message,
            "code": code,
        }
        return JsonResponse(error_response, status=code)
