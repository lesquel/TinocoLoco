from rest_framework.routers import DefaultRouter
from .views import EventRentalViewSet

# Crear un router
service_router = DefaultRouter()
service_router.register("event-rental", EventRentalViewSet, basename="event_rental")

urlpatterns = service_router.urls
