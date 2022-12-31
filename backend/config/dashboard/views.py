from django.shortcuts import render
from django.http import Http404, StreamingHttpResponse, HttpResponseBadRequest, FileResponse, HttpResponse
from django.contrib.admin.views.decorators import staff_member_required
from django.core.files.storage import default_storage
from django.views.decorators.http import require_POST
from django.core.mail import EmailMessage
from django.core import mail
from django.conf import settings

from order.models import Order, OrderItem
from product.models import Product
from login.models import User

import csv, string, random, os
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
    all_orders = Order.objects.filter(is_paid=True).all()
    for order in all_orders:
        amount_received += int(float(order.amount))
    unsuccessful_orders = Order.objects.filter(is_paid=False).count()
    pending_orders = Order.objects.filter(is_paid=None).count()
    items_ordered = 0
    items = []
    products = Product.objects.all()
    for product in products:
        orders_count = OrderItem.objects.filter(product=product, order__is_paid=True).count()
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
    order_items = OrderItem.objects.filter(product=product, order__is_paid=True).all()
    rows = []
    first_row = ['Name', 'email id', 'Phone Number', 'position']
    if product.is_size_required:
        first_row.append('Size')
    if product.is_name_required:
        first_row.append('Printing Name')
    rows.append(first_row)
    for item in order_items:
        user = item.order.user
        row = [user.name, user.email, user.phone_no, user.position]
        if product.is_size_required:
            row.append(item.size)
        if product.is_name_required:
            row.append(item.printing_name)
        rows.append(row)
    psudo_buffers = Echo()
    writer = csv.writer(psudo_buffers)
    return StreamingHttpResponse(
        (writer.writerow(row) for row in rows),
        content_type='text/csv',
        headers = {'Content-Disposition': f'attachment; filename="{product.name}_orders.csv"'}
    )

email_subject = 'User Credentials for CCS Merchandise Store'

@require_POST
def importUsers(request):
    file = request.FILES.get('file')
    filename = f"{datetime.now().strftime('%Y%m%d_%H%M')}_{file.name}"
    if filename.split('.')[-1]!='csv':
        return HttpResponseBadRequest()
    filename = default_storage.save(filename, file)
    filename = os.path.join(settings.MEDIA_ROOT, filename)
    connection = mail.get_connection()
    connection.open()
    passwordfile_path = os.path.join(settings.MEDIA_ROOT, 'passwords.csv')
    userfile = open(filename, 'r', newline='')
    passwordfile = open(passwordfile_path, 'a', newline='')
    reader = csv.reader(userfile)
    writer = csv.writer(passwordfile)
    writer.writerow(['','','','',''])
    for row in reader:
        password = ''.join(random.choice(string.ascii_letters) for _ in range(8))
        row.append(password)
        writer.writerow(row)
        try:
            user = User(name=row[0], email=row[1], phone_no=row[2], position=row[3])
            user.set_password(password)
            user.save()
        except:
            userfile.close()
            passwordfile.close()
            connection.close()
            return HttpResponse(f"error in {row[0]}, {row[1]}. All previous entries created successfully.")
        email_body = f"""Greetings!

Your password for CCS Merchandise Store(https://merch.ccstiet.com) is {password}

Regards
Team CCS
"""
        email = EmailMessage(email_subject, email_body, settings.EMAIL_HOST_USER, [row[1]])
        connection.send_messages([email])
    userfile.close()
    passwordfile.close()
    connection.close()
    return FileResponse(open(passwordfile_path, 'rb'))
