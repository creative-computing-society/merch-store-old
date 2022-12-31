from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseServerError
from django.shortcuts import render

from .models import Order,OrderItem
from product.models import CartItem
from .serializers import OrderSerializer

from datetime import datetime
import string, random, os

import requests

pg_url = "https://sandbox.cashfree.com/pg/orders"

headers = {
    "accept": "application/json",
    "x-client-id": settings.CF_CLIENT_ID,
    "x-client-secret": settings.CF_SECRET_KEY,
    "x-api-version": "2022-09-01",
    "content-type": "application/json"
}

# Create your views here.

class AllOrders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        queryset = Order.objects.filter(user=user, is_paid=True)
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        user = request.user
        order = Order.objects.filter(id=order_id, user=user).first()
        if order is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)


def generateOrderId():
    flag = "".join(random.choice(string.ascii_letters) for _ in range(6))
    time = datetime.now().strftime('%Y%m%d_%H%M%S')
    return f"ccs_{time}_{flag}"

class initiateOrder(APIView):
    def post(self, request):
        user = request.user
        cart_items = CartItem.objects.filter(user=user)

        if cart_items.count()==0:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        order_id = generateOrderId()
        while(Order.objects.filter(id=order_id).exists()):
            order_id = generateOrderId()
        order = Order(id=order_id, user=user, amount='0')
        order.save()

        amount = 0.00

        for item in cart_items:
            amount += int(item.product.price)
            order_item = OrderItem(order=order, product=item.product, printing_name=item.printing_name, size=item.size)
            order_item.save()
        
        payload = {
            "customer_details": {
                "customer_id": str(user.id),
                "customer_email": user.email,
                "customer_phone": user.phone_no
            },
            "order_meta": {
                "return_url": "http://127.0.0.1:8000/order/post-payment?order_id={order_id}",
                # "payment_methods": "cc,dc,nb,upi,paypal"
            },
            "order_id":order.id,
            "order_amount": amount,
            "order_currency": "INR"
        }

        response = requests.post(pg_url, json=payload, headers=headers)
        
        if response.status_code!=200:
            with open(os.path.join(settings.BASE_DIR, 'logs/pg_error.txt'), 'a') as f:
                f.write(str(response.text))
                f.write('\n')
            order_items = OrderItem.objects.filter(order=order)
            for order_item in order_items:
                order_item.delete()
            order.delete()
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        response_data = response.json()

        order.cf_order_id = response_data['cf_order_id']
        order.payment_session_id = response_data['payment_session_id']
        order.amount = str(amount)
        order.save()
        
        return Response({'payment_session_id': response_data['payment_session_id']}, status=status.HTTP_200_OK)


def postPayment(request):
    order_id = request.GET.get('order_id', '')
    order = Order.objects.filter(id=order_id).first()
    if order is None:
        return HttpResponseNotFound("<h1>Order not found</h1>")
    
    if order.is_paid:
        return HttpResponse("success")
    if order.is_paid==False:
        return HttpResponse("failed")

    response = requests.get(f"{pg_url}/{order_id}", headers=headers)

    if response.status_code!=200:
        with open(os.path.join(settings.BASE_DIR, 'logs/pg_error.txt'), 'a') as f:
            f.write(str(response.text))
            f.write('\n')
        return HttpResponseServerError("Oops! Something went wrong.")
    
    response_data = response.json()

    if response_data['order_status']=='PAID':
        order.is_paid = True
        order.save()
        for item in order.order_items.all():
            cart_item = CartItem.objects.filter(user=order.user, product=item.product).first()
            if cart_item is not None:
                cart_item.delete()
        return HttpResponse('<h1>success</h1>')
    order.is_paid = False
    order.save()
    return HttpResponse('<h1>failed</h1>')

def redirect(request):
    return render(request, 'order/initiate.html')
