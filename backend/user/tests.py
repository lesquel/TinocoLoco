from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from rest_framework.authtoken.models import Token

# Create your tests here.
from .models import CustomUser


class CustomUserTest(APITestCase):

    def setUp(self):
        """Crea un usuario inicial para las pruebas."""
        self.url = reverse("user-list")



    def test_create_user(self):
        """Prueba que se pueda crear un usuario nuevo."""
        CustomUser.objects.all().delete()

        user_data = {
            "username": "user",
            "email": "user@gmail.com",
            "first_name": "User",
            "last_name": "Test",
            "password": "password",
        }
        response = self.client.post(self.url, user_data)
        print(response.data)
        self.assertEqual(response.data["user"]["username"], user_data["username"])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)