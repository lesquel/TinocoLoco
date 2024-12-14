from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext as _
from django.db.utils import IntegrityError
from event_rentals.models import EventRental
from ..models import Review


class RetrieveReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        read_only_fields = [fields]