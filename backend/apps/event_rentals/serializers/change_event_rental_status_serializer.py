from rest_framework import serializers
from base.system_services import EventRentalService
from ..choices import EventRentalStatus
from ..messages import ERROR_MESSAGES

class ChangeEventRentalStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=EventRentalStatus.choices)
    
    class Meta:
        
        fields = ["status"]
        
    def update(self, instance, validated_data):
        status = validated_data.get("status")
        user = self.context.get("request").user
        EventRentalService.change_status(instance, status, user)
        return instance
    
    def validate_status(self, value):
        if value not in dict(EventRentalStatus.choices):
            raise serializers.ValidationError(ERROR_MESSAGES["INVALID_STATUS"])
        return value
    
