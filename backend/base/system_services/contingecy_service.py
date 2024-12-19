from apps.contingencies.models import Contingency
from ..abstracts.Aservice import AService

class ContingencyService(AService):
    model = Contingency
