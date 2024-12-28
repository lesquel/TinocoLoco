from base.utils import update_jazzmin_config


class UpdateJazzminConfigMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        update_jazzmin_config()
        response = self.get_response(request)
        return response
