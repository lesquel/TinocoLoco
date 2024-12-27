from rest_framework import serializers
from base.utils import errors

from ..models.user import CustomUser


class BaseUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser



    def validate_email(self, email):
        if self.instance and self.instance.email == email:
            return email
        if CustomUser.objects.filter(email=email).exists():
            raise errors.EmailAlreadyExistsError()
        return email

    def validate_username(self, username):
        if self.instance and self.instance.username == username:
            return username
        if CustomUser.objects.filter(username=username).exists():
            raise errors.UsernameAlreadyExistsError()
        return username
    
