from django_filters import rest_framework as filters
from ..models.user import CustomUser
from ..choices import SexChoices


class UserFilter(filters.FilterSet):
    username = filters.CharFilter(field_name="username", lookup_expr="icontains")
    identity_card = filters.CharFilter(field_name="identity_card", lookup_expr="icontains")
    email = filters.CharFilter(field_name="email", lookup_expr="icontains")
    first_name = filters.CharFilter(field_name="first_name", lookup_expr="icontains")
    last_name = filters.CharFilter(field_name="last_name", lookup_expr="icontains")
    nationality = filters.CharFilter(field_name="nationality", lookup_expr="icontains")
    role = filters.CharFilter(field_name="role", lookup_expr="icontains")
    email_verified = filters.BooleanFilter(field_name="email_verified")
    sex = filters.ChoiceFilter(field_name="sex", choices=SexChoices.choices, lookup_expr="exact")
    date_joined = filters.DateFromToRangeFilter(field_name="date_joined")
    


    class Meta:
        model = CustomUser
        fields = [
            "username",
            "identity_card",
            "email",
            "first_name",
            "last_name",
            "nationality",
            "role",
            "email_verified",
            "is_active",
            "date_joined",
            "sex",
        ]
