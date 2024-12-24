import os
from pathlib import Path
import environ

env = environ.Env()
environ.Env.read_env()

BASE_DIR = Path(__file__).resolve().parent.parent

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

