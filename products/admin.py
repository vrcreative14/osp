from django.contrib import admin
from .models import ProductCategory,  Garment, GarmentDetails, GarmentSubcategory
# Register your models here.

admin.site.register(ProductCategory)
admin.site.register(Garment)
admin.site.register(GarmentDetails)
admin.site.register(GarmentSubcategory)