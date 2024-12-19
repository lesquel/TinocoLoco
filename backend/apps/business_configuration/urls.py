from django.urls import path
from .views import BusinessConfigurationDetailAPIView

urlpatterns = [
    path("configuration/", BusinessConfigurationDetailAPIView.as_view(), name="business-configuration"),
]
