from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewView

review_router = DefaultRouter()
review_router.register("", ReviewView, basename="event")

urlpatterns = [
    path("", include(review_router.urls))
]