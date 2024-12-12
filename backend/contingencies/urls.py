from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContingencyView,ContingencyCategoryView

# Crear un router
contingency_router = DefaultRouter()
contingency_router.register("contingency", ContingencyView, basename='contingency')
contingency_router.register("category", ContingencyCategoryView, basename='contingency-category')

# Incluir las URLs del router
urlpatterns = contingency_router.urls