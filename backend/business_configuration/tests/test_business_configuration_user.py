from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import BusinessConfiguration
from rest_framework.authtoken.models import Token
from user.models import CustomUser


class BusinessConfigurationUserTest(APITestCase):

    def setUp(self):
        """Establece la URL base para las pruebas."""
        self.url = reverse("business-configuration")

        self.normal_user = CustomUser.objects.create_user(
            username="testuser",email="testuser@gmail.com", password="password"
        )
        self.normal_user_token = Token.objects.create(user=self.normal_user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.normal_user_token.key}")

        
        
    def test_get_configuration(self):
        """Prueba que se pueda obtener la configuración existente."""


        configurations = BusinessConfiguration.objects.all()

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(configurations), 1)
        
    def test_put_configuration(self):
        """Prueba que el usuairo normal no pueda actualizar una  configuracion """

        BusinessConfiguration.objects.all().delete()

        BusinessConfiguration.objects.create(
            business_name="Viejo Negocio",
            business_address="456 Calle Real",
            business_phone_number="555-987-654",
            business_email="business@gmail.com",
        )

        data = {
            "business_name": "Nuevo Negocio",
            "business_address": "654 Calle Falsa",
        }

        response = self.client.put(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
