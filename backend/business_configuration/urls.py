from .views import BusinessConfigurationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("configuration", BusinessConfigurationViewSet, basename="configuration")

urlpatterns = router.urls
