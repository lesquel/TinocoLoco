import random
import string

def generate_confirmation_code(longitud=6):
    caracteres = string.ascii_letters + string.digits
    return ''.join(random.choice(caracteres) for _ in range(longitud))