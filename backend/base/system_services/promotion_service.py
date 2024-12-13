from promotions.models import Promotion
from ..interfaces.Iservice import IService
class PromotionService(IService):
    model = Promotion
