from pathlib import Path
import environ
from django.utils.translation import gettext_lazy as _
import cloudinary
import os


BASE_DIR = Path(__file__).resolve().parent.parent


env = environ.Env(DEBUG=(bool, False))

environ.Env.read_env()


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")


# Application definition

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

INSTALLED_APPS = DEFAULT_DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS


SWAGGER_SETTINGS = {
    "DOC_EXPANSION": "none",
}

CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS")

# Configuracion de cloudinary
cloudinary.config(
    cloud_name=env("CLOUDINARY_NAME"),
    api_key=env("CLOUDINARY_API_KEY"),
    api_secret=env("CLOUDINARY_API_SECRET"),
    secure=env("CLOUDINARY_SECURE", default=True),
)


DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"


CUSTOM_MIDDLEWARE = [
    "base.middlewares.language_middleware.LanguageMiddleware",  # Se agrega esto para la traduccion de idiomas automatica al iniciar sesion
    # "base.middlewares.error_handler_middleware.ErrorHandlerMiddleware",  # Se agrega esto para el manejo de errores
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # Se agrega esto para el acople con djnago
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",  # Se agrega esto para la traduccion de idiomas
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
] + CUSTOM_MIDDLEWARE


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_PAGINATION_CLASS": "base.pagination.pagination.CustomPagination",
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
}


ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "core.wsgi.application"


# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Modifico esto para que funcione con mi modelo de usuario
AUTH_USER_MODEL = "users.CustomUser"


# Internationalization
LANGUAGE_CODE = env("LANGUAGE_CODE")


# En caso de que de errores: instalar lo siguiente desde mingw-64: pacman -S mingw-w64-x86_64-gettext
# O tambien, agregar la siguiente ruta a variable de entorno: C:\msys64\usr\bin

LANGUAGES = eval(env("LANGUAGES"))


LOCALE_PATHS = [env("LOCALE_PATHS", default=os.path.join(BASE_DIR, "locale"))]

LANGUAGE_COOKIE_NAME = "cookie_language_tinocoloco"

TIME_ZONE = env("TIME_ZONE")

USE_I18N = True


USE_TZ = True


# Static files (CSS, JavaScript, Images)

STATIC_URL = "static/"

# Default primary key field type

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Send email configuration

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_USE_TLS = env("EMAIL_USE_TLS")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL")
