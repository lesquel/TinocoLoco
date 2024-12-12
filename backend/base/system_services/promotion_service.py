from promotions.models import Promotion
from .Iservice import IService
class PromotionService(IService):
    model = Promotion
