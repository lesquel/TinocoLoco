from reviews.models import Review
from .Iservice import IService

class ReviewService(IService):
    model = Review