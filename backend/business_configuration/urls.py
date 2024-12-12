from django.urls import path
from .views import BusinessConfigurationDetailView

urlpatterns = [
    path("", BusinessConfigurationDetailView.as_view(), name="business-configuration"),
]
