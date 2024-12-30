
from .most_popular_mixin import MostPopularMixin
from .most_viewed_mixin import MostViewedMixin
from .better_rated_mixin import BetterRatedMixin
from .retrieve_mixin import RetrieveMixin


class MetricsAnaliticsMixin(MostPopularMixin, MostViewedMixin, BetterRatedMixin, RetrieveMixin):
    pass 