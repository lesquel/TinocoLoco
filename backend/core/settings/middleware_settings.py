

CUSTOM_MIDDLEWARE = [
    "base.middlewares.language_middleware.LanguageMiddleware",  # Se agrega esto para la traduccion de idiomas automatica al iniciar sesion
    "base.middlewares.error_handler_middleware.ErrorHandlerMiddleware",  # Se agrega esto para el manejo de errores
    "base.middlewares.update_jazzmin_config_middleware.UpdateJazzminConfigMiddleware",  # Se agrega esto para la actualizacion de la configuracion de Jazzmin
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
