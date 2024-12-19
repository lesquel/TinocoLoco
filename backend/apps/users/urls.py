from rest_framework.routers import DefaultRouter

from . import views

user_router = DefaultRouter()
user_router.register("", views.UserViewSet, basename="user")

urlpatterns = user_router.urls

