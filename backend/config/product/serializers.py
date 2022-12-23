from rest_framework import serializers

from .models import Product, CartItem


class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'is_name_required', 'is_size_required', 'image_url1', 'image_url2']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'printing_name', 'size']
