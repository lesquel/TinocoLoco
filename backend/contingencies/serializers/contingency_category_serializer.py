from rest_framework import serializers
from ..models import ContingencyCategory

class ContingencyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContingencyCategory
        fields = '__all__'