from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceCategoryView, ServiceView

# Crear un router
service_router = DefaultRouter()
service_router.register("service", ServiceView, basename='service')
service_router.register("category", ServiceCategoryView, basename='service_category')

# Incluir las URLs del router
urlpatterns = service_router.urls