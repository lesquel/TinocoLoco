from abc import ABC
class IService(ABC):
    model = None
    
    @classmethod
    def get_all(cls):
        return cls.model.objects.all()