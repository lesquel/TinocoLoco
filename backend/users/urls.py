from rest_framework.routers import DefaultRouter

from . import views
from django.urls import path, include

user_router = DefaultRouter()
user_router.register("user", views.UserViewSet, basename="user")

urlpatterns = [
    path("", include(user_router.urls)),
    
]

