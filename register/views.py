from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegistrationForm, UserLoginForm

def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            user = form.authenticate_user()  # Autenticar al usuario
            login(request, user)  # Iniciar sesión
            return redirect('home')  # Redirigir a la página principal o donde desees
    else:
        form = UserLoginForm()
    
    return render(request, 'register/pages/login.html', {'form': form})


def register_view(request):
    if request.method == "POST":
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')  # Redirige a la página de login después de registrarse
    else:
        form = UserRegistrationForm()
    
    return render(request, 'register/pages/register.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('home')
