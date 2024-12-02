from django.urls import path
from .views import BusinessConfigurationDetailView

urlpatterns = [
    path('business-configuration/', BusinessConfigurationDetailView.as_view(), name='business-configuration-detail'),
]
