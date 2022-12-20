from django.db import models

# Create your models here.
class product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField(null=True, blank=True, default=None)
    image_url = models.URLField(max_length=5000, null=True, default=None)
    def __str__(self):
        return self.name