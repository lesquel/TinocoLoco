from django_filters import rest_framework as filters
from ..models import EventRental


class EventRentalFilter(filters.FilterSet):
    event = filters.CharFilter(field_name="event_id", lookup_expr="exact")
    user = filters.CharFilter(field_name="owner_id", lookup_expr="exact")
    event_rental_date = filters.DateFilter()
    min_cost = filters.NumberFilter(field_name="event_rental_cost", lookup_expr="gte")
    max_cost = filters.NumberFilter(field_name="event_rental_cost", lookup_expr="lte")
    min_attendees = filters.NumberFilter(
        field_name="event_rental_min_attendees", lookup_expr="gte"
    )
    max_attendees = filters.NumberFilter(
        field_name="event_rental_max_attendees", lookup_expr="lte"
    )
    payment_method = filters.CharFilter(
        field_name="event_rental_payment_method", lookup_expr="exact"
    )
    promotion = filters.CharFilter(field_name="promotions_id", lookup_expr="exact")
    service = filters.CharFilter(
        field_name="event_rental_services__service_id", lookup_expr="exact"
    )

    class Meta:
        model = EventRental
        fields = [
            "event",
            "user",
            "event_rental_date",
            "min_cost",
            "max_cost",
            "min_attendees",
            "max_attendees",
            "payment_method",
            "service",
            "promotion",
        ]
