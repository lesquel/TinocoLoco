from rest_framework import serializers
from base.utils import ImageUtils
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review()
        fields = "__all__"
