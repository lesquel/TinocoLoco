from services.models import ServiceCategory
from ..interfaces.Iservice import IService

class ServiceCategoryService(IService):
    model = ServiceCategory