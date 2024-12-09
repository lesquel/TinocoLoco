from rest_framework import serializers
from user.models import CustomUser

class RetrieveUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "sex",
        ]  
        read_only_fields = ["id", "username", "email"] 

    