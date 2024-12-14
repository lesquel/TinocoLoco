from rest_framework import serializers
from ..models import RentalStatusHistory


class RentalStatusHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = RentalStatusHistory
        fields = "__all__"
