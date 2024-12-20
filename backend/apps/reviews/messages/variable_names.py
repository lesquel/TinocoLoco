from django.utils.translation import gettext_lazy as _

VARIABLE_NAMES_REVIEW = {
    "OWNER": _("Propietario"),
    "CONTENT_TYPE": _("Tipo de contenido"),
    "OBJECT_ID": _("ID del objeto"),
    "RATING_SCORE": _("Puntuación"),
    "RATING_COMMENT": _("Comentario"),
    "CREATED_AT": _("Fecha de creación"),
    "META_VERBOSE_NAME": _("Reseña"),
    "META_VERBOSE_NAME_PLURAL": _("Reseñas"),
    "UNIQUE_CONSTRAINT_NAME": _("unique_review_per_owner"),
}
