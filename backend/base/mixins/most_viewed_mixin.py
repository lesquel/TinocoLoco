from rest_framework.decorators import action

class MostViewedMixin:


    @action(detail=False, methods=["get"], url_path="most-viewed")
    def most_viewed(self, request):

        queryset = self.get_most_viewed_queryset()
        return self.paginate_and_respond(queryset)
    
    def get_most_viewed_queryset(self):

        raise NotImplementedError("Este método debe ser sobrescrito en el ViewSet.")