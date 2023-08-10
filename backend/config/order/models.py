from django.db import models

from product.models import Product, CartItem
from login.models import User
from .tasks import send_order_acceptance_email, send_order_rejection_email
from datetime import datetime

# Create your models here.

def screenshot_file_path(obj, filename):
    return f"screenshots/{obj.user.email.split('@')[0]}_{filename}"

class Order(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    created_at = models.DateTimeField(auto_now_add=True)
    amount = models.CharField(max_length=10)

    screenshot = models.ImageField(upload_to=screenshot_file_path, null=True, default=None)
    is_verified = models.BooleanField(null=True, default=None)

    mail_added = models.BooleanField(default=False) #also to check if cart restored in case of failed attemt
    
    def __str__(self):
        return self.id
    
    def save(self, *args, **kwargs):

        if not self.mail_added and self.is_verified is not None:

            if self.is_verified:
                products = []
                order_items = self.order_items.all()
                for item in order_items:
                    products.append(item.product.name)
                send_order_acceptance_email.delay(self.id, self.amount, products, self.user.name, self.user.email)
            else:
                send_order_rejection_email.delay(self.id, self.user.name, self.user.email)

            if not self.is_verified:
                order_items = self.order_items.all()
                for item in order_items:
                    if not CartItem.objects.filter(user=self.user, product=item.product).exists():
                        cart_item = CartItem(user=self.user, product=item.product, printing_name=item.printing_name, size=item.size)
                        cart_item.save()

            self.mail_added = True
        
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, null=True, on_delete=models.CASCADE, related_name='order_items')

    printing_name = models.CharField(max_length=100, null=True, blank=True, default=None)
    size = models.CharField(max_length=5, null=True, blank=True, default=None)
    image_url = models.URLField(max_length=5000, null=True, blank=True, default=None)

    def __str__(self):
        return f"{self.order.id }_{self.product.name}"


def paymentQrUploadPath(instance, filename):
    return f"qr/{instance.amount}_{filename.replace(' ', '_')}"

class PaymentQr(models.Model):
    amount = models.CharField(unique=True, max_length=15, help_text='Make sure that amount is in floting point representation. For example, input 100.0 to represent 100')
    image = models.ImageField(upload_to=paymentQrUploadPath)

    def __set__(self):
        return self.amount
