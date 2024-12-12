from services.models import ServiceCategory
from .Iservice import IService

class ServiceCategoryService(IService):
    model = ServiceCategory