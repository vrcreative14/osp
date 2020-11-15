from django.db import models
from multiselectfield import MultiSelectField
from stores.models import Store


# Create your models here.


class ProductCategory(models.Model):
       id = models.IntegerField(primary_key=True)
       name = models.CharField(max_length=50, unique=True)

       class Meta:
           verbose_name_plural = 'ProductCategories'

       def __str__(self):
           return self.name

class ProductDetails(models.Model):
    specific_name = models.CharField(max_length=100)
    weight=models.DecimalField(max_digits=20, decimal_places=2)
    height=models.DecimalField(max_digits=20, decimal_places=2)
    width=models.DecimalField(max_digits=20, decimal_places=2)
    depth=models.DecimalField(max_digits=20, decimal_places=2)
    colors = models.CharField(max_length=150)
    material = models.CharField(max_length=100)
    is_discounted = models.BooleanField(default=False)
    discount = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    is_available = models.BooleanField(default=True)
    
    class Meta:
        abstract = True



class Product(models.Model):
    name=models.CharField(max_length=70)
    image=models.ImageField(upload_to='static/images', height_field=None, blank=True)
    #store=models.ManyToManyField(Store)
    #type=models.ForeignKey(ProductType, on_delete=models.CASCADE)        
    img_path = models.CharField(max_length=100)    
    brand_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=19, decimal_places=2)
    #product_details = models.ForeignKey(ProductDetails, on_delete=models.SET_DEFAULT)
    #product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
    store = models.ManyToManyField(Store)   
    # def __str__(self):
    #     return str(self.name)
    class Meta:
        abstract = True

class GarmentSubcategory(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
           verbose_name_plural = 'GarmentSubcategories'

    def __str__(self):
        return str(self.name)


class GarmentDetails(ProductDetails):
    season = (
        ('Rainy', 'Rainy'),
        ('Spring', 'Spring'),
        ('Winter', 'Winter'),
        ('Autumn', 'Autumn'),
        ('Summer', 'Summer'),
    )

    neck_design = (
        ('Round', 'Round'),
        ('V-neck' , 'V-neck'),
        ('PoloCollar','PoloCollar')
    )

    # used_for = (
    #     ('upperbody','upperbody')
    #     ('lowerbody','lowerbody')
    #     ('head','head')
    #     ('feet','feet')
    #     ('hands' , 'hands' 
    # )

    pockets_qty = models.IntegerField(default=1, blank=True)
    zip_qty = models.IntegerField(default=0, blank=True)
    description = models.TextField(blank=True)
    subcategory = models.ManyToManyField(GarmentSubcategory)
    suitable_season = MultiSelectField(choices = season)
    neck_design = models.CharField(max_length=20, choices=neck_design, default='Round')

    class Meta:
           verbose_name_plural = 'GarmentDetails'

    def __str__(self):
        return str(ProductDetails.specific_name)



class Garment(Product):
    GARMENT_CATEGORY = (
        ('Men', "Men's Wear"),
        ('Women',"Women's Wear"),
        ('Infant', "Baby wear"),
        ('Boy', "Boys wear"),
        ('Girl',"Girls Wear"),
        # ('Ethnic', "Ethnic Wear"),
        # ('Designer','Designer Wear'),
        # ('Casual', 'Casual'),
        # ('Party', 'Party Wear'),
        # ('Uniform', 'School Uniform')
    )
    name = models.CharField(max_length=100)
    #product = models.OneToOneField(Product,on_delete=models.CASCADE)
    fabric = models.CharField(max_length=30)
    category = MultiSelectField(choices = GARMENT_CATEGORY)
    garment_details = models.ForeignKey(GarmentDetails, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.name)

class Inventory(models.Model):
    clothing = models.ManyToManyField(Garment)
    # jewellery = models.ManyToManyField()

    
    


# class Cart(models.Model):
#     products = models.ManyToManyField(Inventory)




    
