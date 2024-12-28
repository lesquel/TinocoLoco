from django.conf import settings
import requests
from django.utils.translation import gettext_lazy as _
import os


def download_logo_from_cloudinary(logo_url):

    logo_filename = logo_url.split("/")[-1]
    logo_path = os.path.join(settings.BASE_DIR, "static", "logo", logo_filename)

    logo_dir = os.path.dirname(logo_path)
    if not os.path.exists(logo_dir):
        os.makedirs(logo_dir)

    if not os.path.exists(logo_path):
        response = requests.get(logo_url)
        if response.status_code == 200:
            with open(logo_path, "wb") as f:
                f.write(response.content)
        else:
            raise Exception(
                f"No se pudo descargar el logo desde Cloudinary. Estado: {response.status_code}."
            )

    return os.path.join("/logo", logo_filename)


def update_jazzmin_config():
    from apps.business_configuration.models import BusinessConfiguration
    configuration, created = BusinessConfiguration.objects.get_or_create(id=1)

    if configuration.business_logo:
        cloudinary_logo_url = configuration.business_logo.url
        local_logo_path = download_logo_from_cloudinary(cloudinary_logo_url)
        welcome_sign = _("Bienvenido a la administración de {}").format(
            configuration.business_name
        )
        settings.JAZZMIN_SETTINGS.update(
            {
                "site_title": configuration.business_name,
                "site_icon": local_logo_path,
                "site_header": configuration.business_name,
                "site_brand": configuration.business_name,
                "site_logo": local_logo_path,
                "login_logo": local_logo_path,
                "welcome_sign": welcome_sign,
                "copyright": (
                    f"© {configuration.business_name} - {configuration.business_email}"
                ),
                "topmenu_links": [
                    {
                        "name": "Home",
                        "url": "admin:index",
                    },
                    {
                        "name": "View Page",
                        "url": configuration.business_website_url if configuration.business_website_url else "#",
                        "new_window": True,
                    },
                ],
            }
        )
