from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Product, CartItem
# Create your views here.


class AddToCart(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        product_id = request.data.get('product_id')
        product = Product.objects.filter(id=product_id)
        user = request.user
        if product is None or CartItem.objects.filter(user=user, product=product).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        printing_name = request.data.get('printing_name')
        size = request.data.get('size')
        if product.is_name_required and printing_name is None or product.is_size_required and size is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        cart_item = CartItem(product=product, user=user, printing_name=printing_name, size=size)
        cart_item.save()
        return Response(status=status.HTTP_200_OK)
