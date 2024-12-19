from rest_framework import serializers
from django.utils.translation import gettext as _
from ..models import Review


class RetrieveReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        read_only_fields = [fields]