from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PhotoViewSet

photo_router = DefaultRouter()
photo_router.register("", PhotoViewSet, basename="photo")

urlpatterns = photo_router.urls
