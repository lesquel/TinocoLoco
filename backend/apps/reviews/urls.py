from rest_framework.routers import DefaultRouter
from .views import ReviewView

review_router = DefaultRouter()
review_router.register("review", ReviewView, basename="review")

urlpatterns = review_router.urls