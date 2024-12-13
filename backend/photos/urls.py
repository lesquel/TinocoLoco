from rest_framework.routers import DefaultRouter
from .views import PhotoView

photo_router = DefaultRouter()
photo_router.register("photo", PhotoView, basename="photo")

urlpatterns = photo_router.urls
