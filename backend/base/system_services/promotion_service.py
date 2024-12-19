from apps.promotions.models import Promotion
from ..abstracts.Aanalitics_service import AAnaliticService
class PromotionService(AAnaliticService):
    model = Promotion
