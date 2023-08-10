from django.shortcuts import render, redirect
from django.http import Http404, StreamingHttpResponse, HttpResponseBadRequest, FileResponse, HttpResponse
from django.contrib.admin.views.decorators import staff_member_required
from django.core.files.storage import default_storage
from django.views.decorators.http import require_POST
from django.contrib import messages

from order.models import Order, OrderItem
from product.models import Product, CartItem

from .tasks import add_users

import csv
from datetime import datetime


class ListItem:
    def __init__(self, id, name, price, orders_count):
        self.id = id
        self.name = name
        self.price = price
        self.orders_count = orders_count


# Create your views here.

@staff_member_required
def dashboard(request):
    amount_received = 0
    all_orders = Order.objects.filter(is_verified=True).all()
    for order in all_orders:
        amount_received += int(float(order.amount))
    unsuccessful_orders = Order.objects.filter(is_verified=False).count()
    pending_orders = Order.objects.filter(is_verified=None).count()
    items_ordered = 0
    items = []
    products = Product.objects.all()
    for product in products:
        orders_count = OrderItem.objects.filter(product=product, order__is_verified=True).count()
        item = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'orders_count': orders_count
        }
        items.append(item)
        items_ordered += orders_count
    context = {
        'amount_received': amount_received,
        'items_ordered': items_ordered,
        'unsuccessful_orders': unsuccessful_orders,
        'pending_orders': pending_orders,
        'items': items,
        'productsCount': len(items)
    }
    return render(request, 'dashboard/dashboard.html', context=context)


class Echo:
    def write(self, value):
        return value

@staff_member_required
def ordersCSV(request, id):
    if request.method=='GET':
        raise Http404
    product = Product.objects.filter(id=id).first()
    if product is None:
        raise Http404
    order_items = OrderItem.objects.filter(product=product, order__is_verified=True).all()
    rows = []
    first_row = ['Name', 'email id', 'Phone Number', 'position']
    if product.is_size_required:
        first_row.append('Size')
    if product.is_name_required:
        first_row.append('Printing Name')
    if product.is_image_required:
        first_row.append('Image URL')
    rows.append(first_row)
    for item in order_items:
        user = item.order.user
        row = [user.name, user.email, user.phone_no, user.position]
        if product.is_size_required:
            row.append(item.size)
        if product.is_name_required:
            row.append(item.printing_name)
        if product.is_image_required:
            row.append(item.image_url)
        rows.append(row)
    psudo_buffers = Echo()
    writer = csv.writer(psudo_buffers)
    return StreamingHttpResponse(
        (writer.writerow(row) for row in rows),
        content_type='text/csv',
        headers = {'Content-Disposition': f'attachment; filename="{product.name}_orders.csv"'}
    )


@staff_member_required
@require_POST
def importUsers(request):
    file = request.FILES.get('file')
    filename = f"{datetime.now().strftime('%Y%m%d_%H%M')}_{file.name}"
    if filename.split('.')[-1]!='csv':
        return HttpResponseBadRequest()
    filename = default_storage.save(filename, file)
    add_users.delay(filename)
    messages.success(request, 'File uploaded, check status at Teak Results table from admin panel.')
    return redirect('/dashboard')


@staff_member_required
@require_POST
def stopOrders(request):
    products = Product.objects.all()
    for product in products:
        product.accept_orders = False
        product.save()
    cart_items = CartItem.objects.all()
    for cart_item in cart_items:
        cart_item.delete()
    messages.success(request, 'Stopped receiving orders and cleared all carts')
    return redirect('/dashboard')
