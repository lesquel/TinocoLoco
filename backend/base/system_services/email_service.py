from django.core.mail import send_mail
from django.conf import settings


class EmailService:
    @staticmethod
    def send_email(subject, message, recipient_list):
        """
        Método genérico para enviar correos.
        """
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)

    @classmethod
    def send_event_rental_confirmation_mail(cls, event_rental):
        """
        Enviar correo de confirmación de reserva.
        """
        subject = "Confirmación de reserva"
        message = (
            f"Hola {event_rental.owner},\n\n"
            f"Tu reserva para el evento {event_rental.event} ha sido creada con éxito.\n\n"
            "Detalles de tu reserva:\n"
            f"- Fecha: {event_rental.event_rental_date}\n"
            f"- Horario: {event_rental.event_rental_start_time} - {event_rental.event_rental_planified_end_time}\n"
            f"- Costo: ${event_rental.event_rental_cost :.2f}\n\n"
            f"Para confirmar tu reserva, por favor ingresa el siguiente código: {event_rental.confirmation_code}\n"
            "Gracias por confiar en nosotros.\n"
            "Saludos cordiales."
        )
        recipient_list = [event_rental.owner.email]
        cls.send_email(subject, message, recipient_list)

    @classmethod
    def send_event_rental_status_change_mail(cls, event_rental):
        """
        Enviar correo cuando el estado de una reserva cambie.
        """
        subject = "Cambio de estado de reserva"
        message = (
            f"Hola {event_rental.owner},\n\n"
            f"Tu reserva para el evento {event_rental.event} ha sido actualizada.\n\n"
            "Detalles de tu reserva:\n"
            f"- Fecha: {event_rental.event_rental_date}\n"
            f"- Horario: {event_rental.event_rental_start_time} - {event_rental.event_rental_planified_end_time}\n"
            f"- Costo: ${event_rental.event_rental_cost :.2f}\n"
            f"- Estado: {event_rental.status}\n\n"
            "Gracias por confiar en nosotros.\n"
            "Saludos cordiales."
        )
        recipient_list = [event_rental.owner.email]
        cls.send_email(subject, message, recipient_list)
        
        
    @classmethod
    def send_user_verification_code(cls, user):

        subject = "Código de verificación"
        message = (
            f"Hola {user},\n\n"
            "Gracias por registrarte en nuestra plataforma.\n\n"
            f"Por favor, ingresa el siguiente código para verificar tu cuenta: {user.email_verification_code}\n"
            "Saludos cordiales."
        )
        recipient_list = [user.email]
        cls.send_email(subject, message, recipient_list)


    @classmethod
    def send_password_reset_mail(cls, user, reset_code):

        subject = "Restablecimiento de contraseña"
        message = (
            f"Hola {user.username},\n\n"
            "Parece que has solicitado restablecer tu contraseña.\n"
            f"Por favor, usa el siguiente código para completar el proceso: {reset_code}\n\n"
            "Si no solicitaste esto, ignora este correo.\n\n"
            "Saludos cordiales."
        )
        recipient_list = [user.email]
        EmailService.send_email(subject, message, recipient_list)

