from django.utils.translation import gettext as _
from rest_framework import serializers
from .models import BusinessConfiguration

class BusinessConfigurationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BusinessConfiguration
        fields = '__all__'