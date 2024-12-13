from contingencies.models import ContingencyCategory
from ..interfaces.Iservice import IService

class ContingencyCategoryService(IService):
    model = ContingencyCategory
