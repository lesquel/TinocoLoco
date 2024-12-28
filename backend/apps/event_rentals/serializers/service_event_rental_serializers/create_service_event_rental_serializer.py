from rest_framework import serializers
from base.system_services import ServiceService
from base.utils import errors
from ...messages import ERROR_MESSAGES
from ...models import ServicesEventRental


class CreateServiceEventRentalItemSerializer(serializers.ModelSerializer):
    service_id = serializers.IntegerField(write_only=True)
    service_quantity = serializers.IntegerField(default=1)

    class Meta:
        model = ServicesEventRental
        fields = [
            "service_id",
            "service_quantity",
            "description",
            "service_observation",
        ]

    def validate(self, attrs):
        service = ServiceService.get_by_id(attrs["service_id"])
        if not service:
            raise errors.NotFoundError(ERROR_MESSAGES["SERVICE_NOT_FOUND"])
        if attrs["service_quantity"] < 1:
            raise errors.ValidationError(
                ERROR_MESSAGES["AMOUNT_MUST_BE_GREATER_THAN_ZERO"]
            )
        return attrs

    def create(self, validated_data):
        service = ServiceService.get_by_id(validated_data["service_id"])
        event_rental = self.context["event_rental"]

        return ServicesEventRental.objects.create(
            event_rental=event_rental,
            service=service,
            service_quantity=validated_data["service_quantity"],
            description=validated_data.get("description", ""),
            service_observation=validated_data.get("service_observation", ""),
        )


class CreateServiceEventRentalListSerializer(serializers.ListSerializer):
    def validate(self, data):
        service_ids = [item["service_id"] for item in data]
        if len(service_ids) != len(set(service_ids)):
            raise errors.ValidationError(
                ERROR_MESSAGES["EVENT_RENTAL_ALREADY_HAS_SERVICE"]
            )

        for item_data in data:
            item_serializer = CreateServiceEventRentalItemSerializer(
                data=item_data, context=self.context
            )
            item_serializer.is_valid(raise_exception=True)
        return data

    def create(self, validated_data):
        services = []
        for item_data in validated_data:
            item_serializer = CreateServiceEventRentalItemSerializer(
                data=item_data, context=self.context
            )
            item_serializer.is_valid(raise_exception=True)
            services.append(item_serializer.save())
        return services


class CreateServiceEventRentalSerializer(serializers.ModelSerializer):
    service_id = serializers.IntegerField(write_only=True)
    service_quantity = serializers.IntegerField(default=1)

    class Meta:
        model = ServicesEventRental
        fields = [
            "service_id",
            "service_quantity",
            "description",
            "service_observation",
        ]
        list_serializer_class = CreateServiceEventRentalListSerializer

    def validate(self, attrs):
        item_serializer = CreateServiceEventRentalItemSerializer(
            data=attrs, context=self.context
        )
        item_serializer.is_valid(raise_exception=True)
        return attrs

    def create(self, validated_data):
        item_serializer = CreateServiceEventRentalItemSerializer(
            data=validated_data, context=self.context
        )
        item_serializer.is_valid(raise_exception=True)
        return item_serializer.save()
