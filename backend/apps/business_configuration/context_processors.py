from .models import BusinessConfiguration


def business_configuration(request):
    return {
        "business_configuration": BusinessConfiguration.objects.get_or_create(),
    }
