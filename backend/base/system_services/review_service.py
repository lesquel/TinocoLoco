from reviews.models import Review
from ..abstracts.Aservice import AService

class ReviewService(AService):
    model = Review