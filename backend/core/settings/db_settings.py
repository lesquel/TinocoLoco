from pathlib import Path
import dj_database_url


BASE_DIR = Path(__file__).resolve().parent.parent

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


DATABASES["default"] = dj_database_url.parse(
    "postgresql://tinocoloco_backend_lltq_user:uIMYETKxj6dyrgnDsvvOxBdZfm8eUdHq@dpg-ctmc16bv2p9s73fac69g-a.oregon-postgres.render.com/tinocoloco_backend_lltq"
)
