from django.db import models

# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=100)
    contry = models.CharField(max_length=255)


    class Meta:
        ordering = ['id']
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'


    def __str__(self) -> str:
        return f"company {self.name}"

class Branch(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='branch')
    name = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.PositiveBigIntegerField()

    class Meta:
        ordering = ["id"]
        verbose_name = 'Branch'
        verbose_name_plural = 'Branches'

    def __str__(self) -> str:
        return f"Branch {self.name} - company {self.company.name}"

class Collaborator(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='collaborator')
    name = models.CharField(max_length=100)
    cui = models.PositiveBigIntegerField()

    class Meta:
        ordering = ['id']
        verbose_name = 'Collaborator',
        verbose_name_plural = 'Collaborators'

    def __str__(self) -> str:
        return f"collaborator {self.name}"
