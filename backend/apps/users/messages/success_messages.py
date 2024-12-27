from django.utils.translation import gettext_lazy as _


SUCCESS_MESSAGES = {
    "LOGGED_OUT": _("Desconectado exitosamente"),
    "USER_DELETED": _("Usuario eliminado exitosamente"),
    "LANGUAGE_UPDATED": _("Idioma actualizado correctamente a {}."),
    "EMAIL_VERIFIED": _("Correo electrónico verificado exitosamente"),
    "EMAIL_ALREADY_VERIFIED": _("El correo electrónico ya ha sido verificado."),
    "PASSWORD_RESET_CODE_SENT": _("El código ha sido enviado al correo electrónico."),
    "PASSWORD_RESET_SUCCESS": _("Contraseña restablecida con éxito."),
    "EMAIL_VALIDATION_CODE_SENT": _("Código enviado exitosamente."),
}
