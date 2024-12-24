from rest_framework.decorators import action


class MostPopularMixin:

    @action(detail=False, methods=["get"], url_path="most-popular")
    def most_popular(self, request):

        queryset = self.get_most_popular_queryset()
        return self.paginate_and_respond(queryset)

    def get_most_popular_queryset(self):

        raise NotImplementedError("Este método debe ser sobrescrito en el ViewSet.")
