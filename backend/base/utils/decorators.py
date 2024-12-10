from functools import wraps
from drf_yasg.utils import swagger_auto_schema


def schema_wrapper(serializer_class, response_serializer=None, code=200):
        """Este decorador se encarga de agregar la  documentación de swagger a las vistas de Django Rest Framework."""

        def decorator(func):
            return swagger_auto_schema(
                request_body=serializer_class,
                responses={code: response_serializer} if response_serializer else {},
                operation_description=func.__doc__,
            )(func)

        return decorator
    
    
def schema_wrapper_response_only(response_serializer=None, code=200):
    def decorator(func):
        return swagger_auto_schema(
            responses={code: response_serializer} if response_serializer else {},
            operation_description=func.__doc__,
        )(func)
    return decorator

