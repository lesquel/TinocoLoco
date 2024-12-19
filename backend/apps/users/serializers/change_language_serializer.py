from rest_framework import serializers
from django.conf import settings

from ..choices import LanguageChoices
from base.utils import errors
from base.system_services import UserService


class ChangeLanguageSerializer(serializers.Serializer):
    preferred_language = serializers.ChoiceField(choices=LanguageChoices.choices)

    def update(self, instance, validated_data):
        language = validated_data.get("preferred_language")
        UserService.change_user_language(instance, language)
        return instance

    def validate_preferred_language(self, value):
        if value not in dict(settings.LANGUAGES):
            raise errors.InvalidLanguage()
        return value
