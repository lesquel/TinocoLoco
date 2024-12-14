# import os
# import django

# # Configura el entorno de Django
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
# django.setup()


# from base.system_services import UserService, EventRentalService, ReviewService
# author = UserService.get_by_id(1)
# print(author)
# author2 = UserService.get_by_id(2)
# print(author2)

# event = EventRentalService.get_by_id(1)
# print(event)

# review = ReviewService.get_by_id(1)
# print(review)
# review2 = ReviewService.get_by_id(2)
# print(review2)


# event.owner_rating = review
# event.costumer_rating = review2
# event.save()

# print(event.owner_rating)

# for event in EventRentalService.get_all():
#     print(event.owner_rating)
#     print(event.costumer_rating)
