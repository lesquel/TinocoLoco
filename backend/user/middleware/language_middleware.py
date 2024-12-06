from django.utils import translation

def get_user_language(user):
    if user and hasattr(user, 'preferred_language') and user.preferred_language:
        return user.preferred_language
    return None

class LanguageMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        
        if hasattr(request, 'user') and request.user.is_authenticated:
            language = get_user_language(request.user)
            if language:
                translation.activate(language)
                request.LANGUAGE_CODE = language
        response = self.get_response(request)
        return response
