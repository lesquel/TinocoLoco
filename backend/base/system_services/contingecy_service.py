from contingencies.models import Contingency
from ..interfaces.Iservice import IService

class ContingencyService(IService):
    model = Contingency
