from django.shortcuts import render
from django.contrib.auth.decorators import login_required   
# Create your views here.

def home_view(request):
    is_cliente = request.user.groups.filter(name='Cliente').exists()
    return render(request, 'pages/pages/home.html', {'is_cliente': is_cliente})