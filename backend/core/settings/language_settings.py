import os
from pathlib import Path
import environ

env = environ.Env()
environ.Env.read_env()

BASE_DIR = Path(__file__).resolve().parent.parent

LANGUAGE_CODE = env("LANGUAGE_CODE")

LANGUAGES = eval(env("LANGUAGES"))


LOCALE_PATHS = [env("LOCALE_PATHS", default=os.path.join(BASE_DIR, "locale"))]

LANGUAGE_COOKIE_NAME = "cookie_language_tinocoloco"

TIME_ZONE = env("TIME_ZONE")

USE_I18N = True


USE_TZ = True

