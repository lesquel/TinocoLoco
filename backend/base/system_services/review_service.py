from reviews.models import Review
from ..interfaces.Iservice import IService

class ReviewService(IService):
    model = Review