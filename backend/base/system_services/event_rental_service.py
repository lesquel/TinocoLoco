
from base.utils import errors
from apps.event_rentals.models import EventRental
from ..abstracts.Aservice import AService
from .email_service import EmailService


class EventRentalService(AService):
    model = EventRental

    @classmethod
    def get_most_viewed(cls):
        queryset = cls.get_all()
        return queryset.order_by("-view_count")
    
    @classmethod
    def change_status(cls, event_rental, status, user):
        event_rental.change_status(status, user)
        return event_rental
    
    @classmethod
    def get_reservation_count(cls,filter_field, instance):
        return cls.get_all().filter(**{filter_field: instance}).count()
    
    @classmethod
    def get_by_confirmation_code(cls, confirmation_code):
        try:
            return cls.get_all().get(confirmation_code=confirmation_code)
        except cls.model.DoesNotExist:
            raise errors.NotFoundError()

    @classmethod
    def send_confirmation_mail(cls,event_rental):
        EmailService.send_event_rental_confirmation(event_rental)

    @classmethod
    def send_status_change_mail(cls, event_rental):
        EmailService.send_event_rental_status_change(event_rental)