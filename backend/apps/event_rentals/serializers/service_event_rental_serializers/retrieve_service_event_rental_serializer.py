from rest_framework import serializers
from ...models import ServicesEventRental


class RetrieveServiceEventRentalSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    event_rental_service = serializers.SerializerMethodField()
    class Meta:
        model = ServicesEventRental
        fields = "__all__"
        read_only_fields = [field.name for field in model._meta.fields]



