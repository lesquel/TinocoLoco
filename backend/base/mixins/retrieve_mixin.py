from rest_framework import status
from rest_framework.response import Response

class RetrieveMixin:
    def retrieve(self, request, pk=None):

        instance = self.get_object()
        instance.increase_view_count()
        serializer = self.get_serializer(instance=instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
