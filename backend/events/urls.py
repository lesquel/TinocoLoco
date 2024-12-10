from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventView,EventCategoryView

event_router = DefaultRouter()
event_router.register("event", EventView, basename="event")
event_router.register("category", EventCategoryView, basename="event_category")

urlpatterns = [
    path("", include(event_router.urls))
]