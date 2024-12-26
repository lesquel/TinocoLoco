from django.utils.translation import gettext as _
from abc import ABC
from base.utils import errors

NOT_FOUND = _("{} no encontrado")


class AService(ABC):
    model = None

    @classmethod
    def get_all(cls):
        return cls.model.objects.all()

    @classmethod
    def get_by_id(cls, id):
        try:
            return cls.model.objects.get(id=id)
        except cls.model.DoesNotExist:
            raise errors.NotFoundError(NOT_FOUND.format(cls.model.__name__))

    @classmethod
    def delete(cls, id):
        obj = cls.get_by_id(id)
        obj.delete()
