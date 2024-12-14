from django.utils.translation import gettext_lazy as _

ERROR_MESSAGES = {
    "USERNAME_ALREADY_EXISTS": _("Este nombre de usuario ya está en uso."),
    "IDENTITY_CARD_ALREADY_EXISTS": _("Este número de cédula ya está registrado."),
    "EMAIL_ALREADY_EXISTS": _("Este correo electrónico ya está registrado."),
    "INVALID_SEX": _("Sexo inválido"),
    "MUST_PROVIDE_USERNAME": _("Por favor, ingresar su nombre de usuario."),
    "MUST_PROVIDE_EMAIL": _("Por favor, ingresar su correo electronico."),
    "MUST_PROVIDE_PASSWORD": _("Por favor, ingresar su contrasena."),
}