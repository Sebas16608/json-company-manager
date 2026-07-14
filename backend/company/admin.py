from django.contrib import admin
from .models import Company, Branch, Collaborator
# Register your models here.
admin.site.register(Company)
admin.site.register(Branch)
admin.site.register(Collaborator)
