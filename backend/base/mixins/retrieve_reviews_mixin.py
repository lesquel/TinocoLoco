from rest_framework.decorators import action


class RetrieveReviewsMixin:
    @action(detail=True, methods=["get"], url_path="reviews")
    def reviews(self, request, pk=None):
        item = self.get_object()
        reviews = item.reviews.all()
        return self.paginate_and_respond(reviews)
