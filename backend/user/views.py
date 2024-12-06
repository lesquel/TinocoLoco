from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import CustomUserSerializer


class UserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Crear un nuevo usuario
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = CustomUserSerializer(
            instance=user, data=request.data, partial=True
        )
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
