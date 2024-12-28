from pathlib import Path
import environ
import os
from .jazzmin_settings import *
from .apps_settings import *
from .middleware_settings import *
from .db_settings import *
from .language_settings import *
from .cloudinary_settings import *
from .auth_settings import *
from .templates_settings import *
from .rest_framework_settings import *
from .email_settings import *
env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env()
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = env("SECRET_KEY")
DEBUG = env("DEBUG", default=False)
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS")
ROOT_URLCONF = "core.urls"
WSGI_APPLICATION = "core.wsgi.application"
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') 

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
if not DEBUG:
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
