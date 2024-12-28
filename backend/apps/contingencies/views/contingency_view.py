from rest_framework import viewsets
from django.db.models import F, ExpressionWrapper, DateTimeField

from base.system_services import ContingencyService
from apps.users.permissions import IsAdminOrReadOnly
from ..filters import ContingencyFilter
from ..serializers import ContingencySerializer

# Create your views here.


class ContingencyView(viewsets.ModelViewSet):
    serializer_class = ContingencySerializer
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAdminOrReadOnly]
    queryset = (
        ContingencyService.get_all()
        .annotate(
            contingency_date_occurred=ExpressionWrapper(
                F("event_rental__event_rental_date") + F("contingency_time_occurred"),
                output_field=DateTimeField(),
            )
        )
        .order_by("contingency_date_occurred")
    )
    filterset_class = ContingencyFilter
