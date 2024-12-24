# Application definition

THEME_APPLICATION = [
    "jazzmin",
]

DEFAULT_DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]


THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework.authtoken",
    "cloudinary",
    "cloudinary_storage",
    "corsheaders",
    "drf_yasg",
    "django_filters",
]


LOCAL_APPS = [
    "apps.business_configuration",
    "apps.users",
    "apps.events",
    "apps.event_rentals",
    "apps.services",
    "apps.photos",
    "apps.reviews",
    "apps.promotions",
    "apps.contingencies",
]

INSTALLED_APPS = THEME_APPLICATION + DEFAULT_DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS


SWAGGER_SETTINGS = {
    "DOC_EXPANSION": "none",
}
