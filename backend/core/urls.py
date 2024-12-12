from django.contrib import admin
from django.urls import path, include

# Se usa para la documentacion de la API
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


# Esto es para la documentacion de la API
schema_view = get_schema_view(
    openapi.Info(
        title="Tinocoloco API",
        default_version="v0.1",
        description="Esta es la documentacion de la API de Tinocoloco",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="tinocoloco265@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),

    # Esto es para la documentacion de la API
    path(
        "swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),


    # Rutas de la aplicacion
    path("business-configuration/", include("business_configuration.urls")),
    path("users/", include("users.urls")),
    path("events/", include("events.urls")),
    path("event-rentals/", include("event_rentals.urls")),
    path("services/", include("services.urls")),
    path("photos/", include("photos.urls")),
    path("reviews/", include("reviews.urls")),
    path("promotions/", include("promotions.urls")),
    path("contingencies/", include("contingencies.urls")),
    
]
