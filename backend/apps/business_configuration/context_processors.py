from .models import BusinessConfiguration


def business_configuration(request):
    configuration, _ = BusinessConfiguration.objects.get_or_create()
    print(configuration)
    return {
        "business_configuration":configuration,
    }
