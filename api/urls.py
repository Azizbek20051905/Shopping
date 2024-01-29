from django.urls import path
from .views import ListProduct, ListCategory, DetailCategory, DetailProduct

urlpatterns = [
    path('', ListCategory.as_view()),
    path('<int:pk>/', DetailCategory.as_view()),
    path('product/', ListProduct.as_view()),
    path('product/<int:pk>/', DetailProduct.as_view()),
]
