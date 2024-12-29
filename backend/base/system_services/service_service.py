from django.db.models import Count

from apps.services.models import Service
from base.abstracts import AAnaliticService


class ServiceService(AAnaliticService):
    model = Service
    