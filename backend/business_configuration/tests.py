from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import BusinessConfiguration

class BusinessConfigurationTest(APITestCase):

    def setUp(self):
        """Crea una configuración inicial para las pruebas."""
        self.url = reverse("business-configuration-detail")
        self.configuration = BusinessConfiguration.objects.create(
            business_name="Mi Negocio",
            business_address="123 Calle Falsa",
            business_phone_number="555-123-456",
            business_email="contacto@minegocio.com",
        )

    def test_create_configuration(self):
        """Prueba que se pueda crear una configuración nueva."""
        BusinessConfiguration.objects.all().delete()  # Elimina la configuración existente
        data = {
            "business_name": "Nuevo Negocio",
            "business_address": "456 Calle Verdadera",
            "business_phone_number": "555-987-654",
            "business_email": "nuevo@negocio.com",
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["business_name"], data["business_name"])

    def test_duplicate_configuration(self):
        """Prueba que no se puedan crear configuraciones duplicadas."""
        data = {
            "business_name": "Mi Negocio",
            "business_address": "123 Calle Falsa",
            "business_phone_number": "555-123-456",
            "business_email": "contacto@minegocio.com",
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_get_configuration(self):
        """Prueba que se pueda obtener la configuración existente."""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["business_name"], "Mi Negocio")

    def test_get_no_configuration(self):
        """Prueba que se devuelva un error 404 si no hay configuraciones."""
        BusinessConfiguration.objects.all().delete()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["detail"], "Configuración del negocio no encontrada.")

    def test_put_update_configuration(self):
        """Prueba que se pueda actualizar la configuración existente."""
        data = {
            "business_name": "Negocio Actualizado",
            "business_address": "123 Calle Falsa Actualizada",
            "business_phone_number": "555-111-222",
            "business_email": "actualizado@negocio.com",
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["business_name"], "Negocio Actualizado")

    def test_put_no_configuration(self):
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
