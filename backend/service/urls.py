from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceCategoryView

router = DefaultRouter()
router.register('categories', ServiceCategoryView, basename='service-category')

urlpatterns = [
    path('', include(router.urls)),
]
