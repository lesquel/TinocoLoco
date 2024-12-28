from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
import datetime

def get_business_configuration():
    from apps.business_configuration.models import BusinessConfiguration

    configuration, created = BusinessConfiguration.objects.get_or_create()
    return configuration
class EmailService:
    @staticmethod
    def send_email(subject, recipient_list, html_message, plain_message=None):
        send_mail(
            subject,
            plain_message or "Correo no compatible con texto plano.",
            settings.DEFAULT_FROM_EMAIL,
            recipient_list,
            html_message=html_message,
        )

    @classmethod
    def send_event_rental_confirmation(cls, event_rental):

        subject = "Confirmación de reserva"
        print(event_rental.owner)
        print(event_rental.owner.username)

        context = {
            "subject": subject,
            "user": event_rental.owner,
            "event_name": event_rental.event,
            "event_date": event_rental.event_rental_date,
            "start_time": event_rental.event_rental_start_time,
            "end_time": event_rental.event_rental_planified_end_time,
            "cost": event_rental.event_rental_cost,
            "confirmation_code": event_rental.confirmation_code,
            "year": datetime.datetime.now().year,
            "business_configuration": get_business_configuration(),
        }
        print(context)
        html_message = render_to_string(
            "users/email_event_rental_confirmation.html", context
        )
        plain_message = f"Hola {event_rental.owner}, tu reserva para el evento {event_rental.event} ha sido creada con éxito."
        recipent_list = [event_rental.owner.email]
        cls.send_email(subject, recipent_list, html_message, plain_message)

    @classmethod
    def send_event_rental_status_change(cls, event_rental):
        """
        Enviar correo cuando el estado de una reserva cambie.
        """
        subject = "Cambio de estado de reserva"
        context = {
            "subject": subject,
            "user": event_rental.owner,
            "event_name": event_rental.event,
            "event_date": event_rental.event_rental_date,
            "start_time": event_rental.event_rental_start_time,
            "end_time": event_rental.event_rental_planified_end_time,
            "cost": event_rental.event_rental_cost,
            "status": event_rental.status,
            "year": datetime.datetime.now().year,
            "business_configuration": get_business_configuration(),
        }

        html_message = render_to_string(
            "users/email_event_rental_status_change.html", context
        )
        plain_message = f"Hola {event_rental.owner}, tu reserva para el evento {event_rental.event} ha sido actualizada."
        recipient_list = [event_rental.owner.email]
        cls.send_email(subject, recipient_list, html_message, plain_message)

    @classmethod
    def send_user_verification_code(cls, user):
        subject = "Código de verificación"
        context = {
            "subject": subject,
            "user": user,
            "year": datetime.datetime.now().year,
            "business_configuration": get_business_configuration(),
        }

        html_message = render_to_string("users/email_verification_code.html", context)
        plain_message = f"Hola {user.username}, por favor ingresa el siguiente código para verificar tu cuenta: {user.email_verification_code}."
        recipient_list = [user.email]
        cls.send_email(subject, recipient_list, html_message, plain_message)

    @classmethod
    def send_password_reset_code(cls, user, reset_code):
        subject = "Restablecimiento de contraseña"
        context = {
            "subject": subject,
            "user": user,
            "reset_code": reset_code,
            "year": datetime.datetime.now().year,
            "business_configuration": get_business_configuration(),
        }
        html_message = render_to_string("users/email_reset_password_code.html", context)
        plain_message = (
            f"Hola {user.username},\n\n"
            f"Parece que has solicitado restablecer tu contraseña.\n\n"
            f"Por favor, usa el siguiente código para completar el proceso: {reset_code}\n\n"
            "Si no solicitaste esto, ignora este correo.\n\n"
            "Saludos cordiales."
        )
        recipient_list = [user.email]
        cls.send_email(subject, recipient_list, html_message, plain_message)
