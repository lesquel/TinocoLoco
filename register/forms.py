from django.utils import timezone
from django import forms
from .models import User
from django.contrib.auth.models import Group

classStyle = "input"
classStyleW05 = " input-w-05"
class UserRegistrationForm(forms.ModelForm):
    # Campos adicionales para la contraseña
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': classStyle}), label="Contraseña")
    password_confirm = forms.CharField(widget=forms.PasswordInput(attrs={'class': classStyle}), label="Confirmar Contraseña")

    class Meta:
        model = User
        fields = [
            'cedulaCliente', 
            'nombreCliente', 
            'apellidoCliente', 
            'nacionalidadCliente', 
            'telefonoCliente', 
            'correoCliente', 
            'genero', 
            'username',
        ]
        widgets = {
            'cedulaCliente': forms.TextInput(attrs={'class': classStyle}),
            'nombreCliente': forms.TextInput(attrs={'class': classStyle}),
            'apellidoCliente': forms.TextInput(attrs={'class': classStyle}),	
            'nacionalidadCliente': forms.TextInput(attrs={'class': classStyle}),
            'telefonoCliente': forms.TextInput(attrs={'class': classStyle}),
            'correoCliente': forms.TextInput(attrs={'class': classStyle}),
            'genero': forms.Select(attrs={'class': classStyle}),
            'username': forms.TextInput(attrs={'class': classStyle}),
            # No incluimos 'fechaRegistroCliente' en los campos
        }

    def clean_password_confirm(self):
        password = self.cleaned_data.get('password')
        password_confirm = self.cleaned_data.get('password_confirm')

        if password != password_confirm:
            raise forms.ValidationError("Las contraseñas no coinciden.")
        return password_confirm

    def save(self, commit=True):
        # Guardar el usuario con la contraseña
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        
        # Establecer 'fechaRegistroCliente' automáticamente (si es necesario)
        user.fechaRegistroCliente = timezone.now()  # O la fecha que desees

        if commit:
            user.save()
            group = Group.objects.get(name='Cliente')
            user.groups.add(group)
        
        return user

from django.contrib.auth import authenticate

class UserLoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': classStyle}), label="Nombre de usuario")
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': classStyle}), label="Contraseña")

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if not username:
            raise forms.ValidationError("Por favor, introduce tu nombre de usuario")
        return username

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if not password:
            raise forms.ValidationError("Por favor, introduce tu contraseña")
        return password

    def authenticate_user(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        if user is None:
            raise forms.ValidationError("Nombre de usuario o contraseña incorrectos")
        return user
