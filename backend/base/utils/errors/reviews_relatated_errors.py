from django.utils.translation import gettext_lazy as _
from rest_framework import status
from .baseError import BaseError

RATING_MUST_BE_BETWEEN_1_AND_5 = _("La calificación debe estar entre 1 y 5.")
OWNER_CONTENT_TYPE_OBJECT_ID_EXISTS = _("Ya existe una reseña de este autor para este objeto."),


class RatingMustBeBetween1And5(BaseError):
    def __init__(self, message=RATING_MUST_BE_BETWEEN_1_AND_5, identifier="rating_score"):
        super().__init__(
            message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier
        )

class ReviewAlreadyExits(BaseError):
    def __init__(self, message=OWNER_CONTENT_TYPE_OBJECT_ID_EXISTS, identifier="review"):
        super().__init__(
            message=message, code=status.HTTP_400_BAD_REQUEST, identifier=identifier
        )