from rest_framework.routers import DefaultRouter
from .views import PromotionCategoryView, PromotionView

promotion_router = DefaultRouter()
promotion_router.register("promotion", PromotionView, basename="promotion")
promotion_router.register("category", PromotionCategoryView, basename="promotion_category")

# Incluir las URLs del router
urlpatterns = promotion_router.urls