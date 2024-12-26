from pathlib import Path
import environ

# Importar configuraciones de varios módulos
from .jazzmin_settings import *
from .apps_settings import *
from .middleware_settings import *
from .db_settings import *
from .language_settings import *
from .cloudinary_settings import *
from .auth_settings import *
from .templates_settings import *
from .rest_framework_settings import *

# Inicializar variables de entorno
env = environ.Env(DEBUG=(bool, False))

# Leer variables de entorno desde un archivo .env
environ.Env.read_env()

# Definir el directorio base del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent

# ADVERTENCIA DE SEGURIDAD: mantener la clave secreta utilizada en producción en secreto
SECRET_KEY = env("SECRET_KEY")

# ADVERTENCIA DE SEGURIDAD: no ejecutar con debug activado en producción
DEBUG = env("DEBUG", default=False)

# Definir los hosts permitidos para la aplicación
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

# Definir los orígenes permitidos para CORS
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS")

# Definir la configuración de URL raíz
ROOT_URLCONF = "core.urls"

# Definir la aplicación WSGI
WSGI_APPLICATION = "core.wsgi.application"

# Definir la URL para servir archivos estáticos
STATIC_URL = '/static/'

# Definir los directorios donde se encuentran los archivos estáticos
STATICFILES_DIRS = [BASE_DIR / "static"]

# Definir el directorio donde se recopilarán los archivos estáticos
STATIC_ROOT = BASE_DIR / "staticfiles"


MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Definir el campo automático predeterminado para los modelos
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
