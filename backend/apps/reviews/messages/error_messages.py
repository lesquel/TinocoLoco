from django.utils.translation import gettext_lazy as _

ERROR_MESSAGES = {
    "OWNER_CONTENT_TYPE_OBJECT_ID_EXISTS": _("Ya existe una reseña de este autor para este objeto."),
    "RATING_MUST_BE_BETWEEN_1_AND_5": _("La calificación debe estar entre 1 y 5."),
    "REVIEW_DOES_NOT_EXIST": _("La reseña no existe."),
    "MODEL_DOES_NOT_EXIST": _("El modelo no existe."),
    "REVIEW_ALREADY_EXISTS": _("Ya existe una reseña para este autor y objeto relacionado."),
    
}