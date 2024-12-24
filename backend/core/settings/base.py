from pathlib import Path
import environ



from .jazzmin_settings import *
from .apps_settings import *
from .middleware_settings import *
from .rest_framework_settings import *
from .db_settings import *
from .language_settings import *
from .cloudinary_settings import *
from .auth_settings import *
from .templates_settings import *

env = environ.Env(DEBUG=(bool, False))

environ.Env.read_env()


BASE_DIR = Path(__file__).resolve().parent.parent





# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")


CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS")





ROOT_URLCONF = "core.urls"


WSGI_APPLICATION = "core.wsgi.application"








# Static files (CSS, JavaScript, Images)

STATIC_URL = "static/"

# Default primary key field type

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

