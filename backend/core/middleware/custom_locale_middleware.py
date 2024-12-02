# # myapp/middleware/custom_locale_middleware.py
# from django.utils import translation

# class CustomLocaleMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         # Prioridad 1: Usuario autenticado (si tiene idioma preferido)
#         if request.user.is_authenticated:
#             language = getattr(request.user, 'preferred_language', None)
#         else:
#             # Prioridad 2: Encabezado Accept-Language
#             language = request.headers.get('Accept-Language')
#             # Prioridad 3: Sesión
#             if not language:
#                 language = request.session.get('django_language', 'en')

#         # Activar el idioma
#         translation.activate(language or 'en')
#         request.LANGUAGE_CODE = language or 'en'

#         response = self.get_response(request)
#         translation.deactivate()
#         return response
