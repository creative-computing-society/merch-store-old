from django.db import models
from login.models import User
# Create your models here.
class product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    
    is_customizable = models.BooleanField(default=False)
    size_required = models.BooleanField(default=False)
    
    printed_name = models.CharField(max_length=100, null=True, blank=True, default=None)
    size =  models.CharField(max_length=5, null=True, blank=True, default=None)
    
    description = models.TextField(null=True, blank=True, default=None)
    image_url1 = models.URLField(max_length=5000, null=True, default=None)
    image_url2 = models.URLField(max_length=5000, null=True, default=None)
    def __str__(self):
        return self.name
    
class cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product= models.ForeignKey(product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    