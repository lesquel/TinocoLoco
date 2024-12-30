from rest_framework.decorators import action

class BetterRatedMixin:
    
    
    @action(detail=False, methods=["get"], url_path="better-rated")
    def better_rated(self, request):
        
        queryset = self.get_better_rated_queryset()
        return self.paginate_and_respond(queryset)
    
    def get_better_rated_queryset(self):
        
        raise NotImplementedError("Este método debe ser sobrescrito en el ViewSet.")