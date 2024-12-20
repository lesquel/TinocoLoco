from django.utils.translation import gettext_lazy as _



VARIABLE_NAMES_USER = {
    "IDENTITY_CARD": _("Número de cédula"),
    "USERNAME": _("Nombre de usuario"),
    "NACIONALITY": _("Nacionalidad"),
    "EMAIL": _("Correo electrónico"),
    "EMAIL_VERIFIED": _("Correo electrónico verificado"),
    "EMAIL_VERIFICATION_CODE": _("Código de verificación de correo"),
    "FIRST_NAME": _("Nombre"),
    "LAST_NAME": _("Apellido"),
    "PASSWORD": _("Contraseña"),
    "SEX": _("Sexo"),
    "PREFERRED_LANGUAGE": _("Idioma preferido"),
    "ROLE": _("Rol"),
    "DATE_JOINED": _("Fecha de registro"),
    "IS_ACTIVE": _("Está activo"),
    "IS_STAFF": _("Es personal"),
    "IS_SUPERUSER": _("Es superusuario"),
    
    "META_VERBOSE_NAME": _("Usuario"),
    "META_VERBOSE_NAME_PLURAL": _("Usuarios"),
}



VARIABLE_NAMES_PASSWORD_RESET = {
    "USER": _("Usuario"),
    "CODE": _("Código"),
    "CREATED_AT": _("Creado En"),
    "IS_USED": _("Está Usado"),
    "META_VERBOSE_NAME": _("Código de Restablecimiento de Contraseña"),
    "META_VERBOSE_NAME_PLURAL": _("Códigos de Restablecimiento de Contraseña"),
}