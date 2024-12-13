from promotions.models import PromotionCategory
from ..interfaces.Iservice import IService

class PromotionCategoryService(IService):
    model = PromotionCategory