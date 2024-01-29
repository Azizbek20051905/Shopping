from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from .models import Category, Product

# Create your views here.
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

@method_decorator(login_required(login_url='login'), name='dispatch')
class HomeView(View):
    def get(self, request):
        category = Category.objects.all()
        product = Product.objects.all()
        context = {
            'category': category,
            'product': product,
        }

        return render(request, 'index.html', context)

class RegisterView(View):
    def get(self, request):
        return render(request, 'registration/signup.html')
    
    def post(self, request):
        firstname = request.POST.get('firstname')
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        conf_password = request.POST.get('conf_password')
        
        if User.objects.filter(username=username).exists():
            messages.add_message(request, messages.WARNING, 'Bunday Username band!!!')
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.add_message(request, messages.WARNING, 'Bunday Email band!!!')
            return redirect('register')
        
        if password != conf_password:
            messages.add_message(request, messages.WARNING, 'Parol bir-biriga mos emas')
            return redirect('register')
        
        user = User.objects.create_user(username=username, email=email, password=password)

        login(request, user)
        return redirect('login')

class LoginView(View):
    def get(self, request):
        return render(request, 'registration/signin.html')
    
    def post(self, request):
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if not User.objects.filter(username=username).exists():
            messages.add_message(request, messages.WARNING, 'Bunday Username Mavjud emas!!!')
            return redirect('login')

        if not User.objects.filter(email=email).exists():
            messages.add_message(request, messages.WARNING, 'Bunday Email Mavjud emas!!!')
            return redirect('login')
        
        user = authenticate(request, username=username, email=email, password=password)

        if user is not None:
            login(request, user)

        return redirect('/')

class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('login')