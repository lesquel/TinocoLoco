from rest_framework import serializers
from ..models import Contingency

class ContingencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Contingency
        fields = '__all__'