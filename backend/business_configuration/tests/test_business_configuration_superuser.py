from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import BusinessConfiguration
from rest_framework.authtoken.models import Token
from user.models import CustomUser


class BusinessConfigurationSuperUserTest(APITestCase):

    def setUp(self):
        """Establece la URL base para las pruebas."""
        self.url = reverse("business-configuration")

        self.super_user = CustomUser.objects.create_superuser(
            username="testuser", email="testuser@gmail.com", password="password"
        )
        self.super_user_token = Token.objects.create(user=self.super_user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.super_user_token.key}")

        self.business_configuration = BusinessConfiguration.objects.create(
            business_name="Viejo Negocio",
            business_address="456 Calle Real",
            business_phone_number="555-987-654",
            business_email="business@gmail.com",
        )

    def test_put_configuration(self):
        """Prueba que se pueda actualizar una configuracion con el metodo PUT."""

        data = {
            "business_name": "Nuevo Negocio",
            "business_address": "654 Calle Falsa",
        }

        response = self.client.put(self.url, data)
        print(response)
        print(response.data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["configuration"]["business_name"], "Nuevo Negocio")
        

    def test_put_no_configuration_404(self):
        """Prueba que intentar actualizar sin configuración existente devuelva 404."""
        BusinessConfiguration.objects.all().delete()
        data = {
            "business_name": "Intento Actualizar",
            "business_address": "Calle Inexistente",
            "business_phone_number": "555-000-000",
            "business_email": "inexistente@negocio.com",
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
