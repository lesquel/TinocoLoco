from rest_framework import serializers
from ...models import ServicesEventRental


class RetrieveServiceEventRentalSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    event_rental_service = serializers.SerializerMethodField()
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
        ]



