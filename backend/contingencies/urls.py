from rest_framework.routers import DefaultRouter
from .views import ContingencyView

# Crear un router
contingency_router = DefaultRouter()
contingency_router.register("contingency", ContingencyView, basename='contingency')

# Incluir las URLs del router
urlpatterns = contingency_router.urls