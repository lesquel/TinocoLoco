from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PhotoView

photo_router = DefaultRouter()
photo_router.register("", PhotoView, basename="photo")

urlpatterns = [
    path("", include(photo_router.urls)),
]
