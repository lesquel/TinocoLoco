from rest_framework import serializers
from base.system_services import ServiceService, ServicesEventRentalService
from ..models import ServicesEventRental


class RetrieveServiceEventRentalSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()

    class Meta:
        model = ServicesEventRental
        fields = [
            "id",
            "eventrental",
            "service",
            "service_quantity",
            "status",
            "date_to_deliver",
            "description",
            "service_observation",
        ]

    def get_total(self, obj: ServicesEventRental):
        return obj.service.service_unitary_cost * obj.service_quantity


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

    def validate(self, attrs):
        if not ServiceService.get_by_id(attrs["service_id"]):
            raise serializers.ValidationError("El servicio no existe.")
        if attrs["service_quantity"] < 1:
            raise serializers.ValidationError(
                "La cantidad de servicios debe ser mayor a 0."
            )
        if (
            ServicesEventRentalService.get_all()
            .filter(
                eventrental=self.context["event_rental"], service_id=attrs["service_id"]
            )
            .exists()
        ):
            raise serializers.ValidationError(
                "El servicio ya está asociado a este alquiler de evento."
            )
        if attrs["date_to_deliver"] < self.context["event_rental"].event_rental_date:
            raise serializers.ValidationError(
                "La fecha de entrega del servicio no puede ser menor a la fecha de inicio del alquiler de evento."
            )
        return attrs

    def create(self, validated_data):
        service = ServiceService.get_by_id(validated_data["service_id"])
        event_rental = self.context["event_rental"]

        event_rental_service = ServicesEventRental.objects.create(
            eventrental=event_rental,
            service=service,
            service_quantity=validated_data["service_quantity"],
            date_to_deliver=validated_data["date_to_deliver"],
        )
        return event_rental_service
