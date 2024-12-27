from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import EventRental
from base.system_services import EventRentalService  

@receiver(post_save, sender=EventRental)
def send_confirmation_email(sender, instance, created, **kwargs):
    if created: 
        EventRentalService.send_confirmation_mail(instance)



@receiver(post_save, sender=EventRental)
def send_status_change_email(sender, instance, created, **kwargs):

    if not created:  
        if 'status' in instance.get_dirty_fields():
            EventRentalService.send_status_change_mail(instance)