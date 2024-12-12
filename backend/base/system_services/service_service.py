from services.models import Service
from .Iservice import IService


class ServiceService(IService):
    model = Service