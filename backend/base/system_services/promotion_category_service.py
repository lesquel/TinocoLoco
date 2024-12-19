from apps.promotions.models import PromotionCategory
from ..abstracts.Aservice import AService

class PromotionCategoryService(AService):
    model = PromotionCategory