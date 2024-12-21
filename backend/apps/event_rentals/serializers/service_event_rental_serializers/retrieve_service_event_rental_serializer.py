from rest_framework import serializers
from ...models import ServicesEventRental


class RetrieveServiceEventRentalSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()

    class Meta:
        model = ServicesEventRental
        fields = [
            "id",
            "event_rental",
            "service",
            "service_quantity",
            "status",
            "date_to_deliver",
            "description",
            "service_observation",
            "total",
        ]

    def get_total(self, obj: ServicesEventRental):
        return obj.service.service_unitary_cost * obj.service_quantity

