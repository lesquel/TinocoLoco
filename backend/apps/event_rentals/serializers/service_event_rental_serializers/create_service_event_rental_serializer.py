from rest_framework import serializers
from base.system_services import ServiceService

from base.utils import errors
from ...messages import ERROR_MESSAGES
from ...models import ServicesEventRental


class CreateServiceEventRentalItemSerializer(serializers.ModelSerializer):
    service_id = serializers.IntegerField(write_only=True)
    service_quantity = serializers.IntegerField(default=1)
    date_to_deliver = serializers.DateField()

    class Meta:
        model = ServicesEventRental
        fields = [
            "service_id",
            "service_quantity",
            "date_to_deliver",
            "description",
            "service_observation",
        ]

    def validate(self, attrs):
        if not ServiceService.get_by_id(attrs["service_id"]):
            raise errors.NotFoundError(ERROR_MESSAGES["SERVICE_NOT_FOUND"])
        if attrs["service_quantity"] < 1:
            raise errors.ValidationError(
                ERROR_MESSAGES["AMOUNT_MUST_BE_GREATER_THAN_ZERO"]
            )
        if attrs["date_to_deliver"] < self.context["event_rental"].event_rental_date:
            raise errors.ValidationError(ERROR_MESSAGES["INVALID_DELIVERY_DATE"])
        return attrs

    def create(self, validated_data):
        service = ServiceService.get_by_id(validated_data["service_id"])
        event_rental = self.context["event_rental"]

        event_rental_service = ServicesEventRental.objects.create(
            eventrental=event_rental,
            service=service,
            service_quantity=validated_data["service_quantity"],
            date_to_deliver=validated_data["date_to_deliver"],
            description=validated_data.get("description", ""),
            service_observation=validated_data.get("service_observation", ""),
        )
        return event_rental_service


class CreateServiceEventRentalListSerializer(serializers.ListSerializer):
    def validate(self, data):
        service_ids = [item["service_id"] for item in data]
        if len(service_ids) != len(set(service_ids)):
            raise errors.ValidationError(ERROR_MESSAGES["EVENT_RENTAL_ALREADY_HAS_SERVICE"])
        return data

    def create(self, validated_data):
        event_rental = self.context["event_rental"]
        services = []

        for item in validated_data:
            service = ServiceService.get_by_id(item["service_id"])
            event_rental_service = ServicesEventRental.objects.create(
                event_rental=event_rental,
                service=service,
                service_quantity=item["service_quantity"],
                date_to_deliver=item["date_to_deliver"],
                description=item.get("description", ""),
                service_observation=item.get("service_observation", ""),
            )
            services.append(event_rental_service)

        return services


class CreateServiceEventRentalSerializer(serializers.ModelSerializer):
    service_id = serializers.IntegerField(write_only=True)
    service_quantity = serializers.IntegerField(default=1)
    date_to_deliver = serializers.DateField()

    class Meta:
        model = ServicesEventRental
        fields = [
            "service_id",
            "service_quantity",
            "date_to_deliver",
            "description",
            "service_observation",
        ]
        list_serializer_class = CreateServiceEventRentalListSerializer
