from rest_framework import serializers
from apps.services.serializers import ServiceSerializer
from ...models import ServicesEventRental


class RetrieveServiceEventRentalSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    service = ServiceSerializer()
    class Meta:
        model = ServicesEventRental
        fields = "__all__"
        read_only_fields = [field.name for field in model._meta.fields]



