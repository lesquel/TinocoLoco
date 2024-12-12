from promotions.models import PromotionCategory
from .Iservice import IService

class PromotionCategoryService(IService):
    model = PromotionCategory