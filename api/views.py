from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import CategorySerializer, ProductSerializer
from shopping.models import Category, Product


from django.shortcuts import render

# Create your views here.
class ListCategory(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class DetailCategory(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ListProduct(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class DetailProduct(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
