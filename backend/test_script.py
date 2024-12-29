import os
import django
from django.db.models import Avg

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from base.system_services import EventService

# Fetch the most popular events
most_popular_events = EventService.get_most_populars()

# Output results
for event in most_popular_events:
    avg_rating = event.avg_rating  # Annotated field from the query
    print(f"Event: {event.event_name}, Avg Rating: {avg_rating:.2f}" if avg_rating else "No reviews")
