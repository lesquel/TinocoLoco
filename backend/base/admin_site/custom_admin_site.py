from django.contrib.admin import AdminSite
from django.utils.translation import gettext_lazy as _
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
                self.site_title = f"{configuration.business_name} Admin"
                self.site_header = f"{configuration.business_name} Admin"
                self.index_title = _("Bienvenido a la administración de {}").format(configuration.business_name)
        except BusinessConfiguration.DoesNotExist:
            self.site_header = CustomAdminSite.site_header
            self.site_title = CustomAdminSite.site_title
            self.index_title = CustomAdminSite.index_title

        context['site_title'] = self.site_title
        context['site_header'] = self.site_header
        context['index_title'] = self.index_title

        return context
