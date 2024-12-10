from django.contrib import admin

# Register your models here.
from .models import EventRental, Promotion,PromotionCategory,Contingency,AdminRating,RentalStatusHistory

admin.site.register(EventRental)
admin.site.register(Promotion)
admin.site.register(PromotionCategory)
admin.site.register(Contingency)
admin.site.register(AdminRating)
admin.site.register(RentalStatusHistory)

