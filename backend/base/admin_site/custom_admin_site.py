from django.contrib.admin import AdminSite
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from apps.business_configuration.models import BusinessConfiguration

class CustomAdminSite(AdminSite):
    site_header = "Default Admin"
    site_title = "Default Admin"
    index_title = _("Bienvenido a la administración")

    def each_context(self, request):
        context = super().each_context(request)
        try:
            configuration = BusinessConfiguration.objects.first()
            if configuration:
                site_title = f"{configuration.business_name} Admin"
                site_header = f"{configuration.business_name} Admin"
                index_title = _("Bienvenido a la administración de {}").format(configuration.business_name)

                # Actualiza las configuraciones de Jazzmin
                settings.JAZZMIN_SETTINGS["site_title"] = site_title
                settings.JAZZMIN_SETTINGS["site_header"] = site_header
                settings.JAZZMIN_SETTINGS["welcome_sign"] = index_title

        except BusinessConfiguration.DoesNotExist:
            pass

        context['site_title'] = settings.JAZZMIN_SETTINGS.get("site_title", self.site_title)
        context['site_header'] = settings.JAZZMIN_SETTINGS.get("site_header", self.site_header)
        context['index_title'] = settings.JAZZMIN_SETTINGS.get("welcome_sign", self.index_title)

        return context
