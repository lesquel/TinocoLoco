from services.models import Service
from base.interfaces import IAnaliticService


class ServiceService(IAnaliticService):
    model = Service