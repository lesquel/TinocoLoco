from rest_framework import serializers
from django.conf import settings

from user.choices import LanguageChoices
from base.utils import errors
from base.services import UserService


class ChangeLanguageSerializer(serializers.Serializer):
    language = serializers.CharField(required=True, )

    def update(self, instance, validated_data):
        language = validated_data["language"]
        UserService.change_user_language(instance, language)

    def validate_preferred_language(self, value):
        if value not in dict(settings.LANGUAGES):
            raise errors.InvalidLanguage()
        return value
