from rest_framework import serializers

from .models import Product, CartItem
from order.models import OrderItem


class ProductSerializer(serializers.ModelSerializer):

    status = serializers.SerializerMethodField()

    def get_status(self, obj):
        user  = self.context.get('user')
        if user is None:
            return ""
        if not obj.accept_orders:
            return "forbidden"
        if OrderItem.objects.filter(product=obj, order__user=user, order__is_paid=True).exists():
            return "ordered"
        if CartItem.objects.filter(product=obj, user=user).exists():
            return "incart"
        return "allowed"
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'is_name_required', 'is_size_required', 'image_url1', 'image_url2', 'status']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'printing_name', 'size']
