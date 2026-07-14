from django.core.validators import MinLengthValidator, MaxLengthValidator
from rest_framework import serializers
from .models import Company, Branch, Collaborator

class CompanySerializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[MinLengthValidator(4, message='The name must be least 4 characters long'), MaxLengthValidator(100, message='The name can only have 100 characters')])
    class Meta:
        model = Company
        fields = ['id', 'name', 'country']

class BranchSerializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[MinLengthValidator(4, message='The name must be least 4 characters long'), MaxLengthValidator(100, message='The name can only have 100 characters')])
    phone = serializers.CharField(validators=[MinLengthValidator(8, message='The phone number must be least 8 characters long'), MaxLengthValidator(20, message='The phone number can only have 20 characters')])
    company = CompanySerializer(read_only=True)
    class Meta:
        model = Branch
        fields = ['id','company', 'name', 'address', 'phone', 'collaborator']

class CollaboratorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[MinLengthValidator(4, message='The name must be least 4 characters long'), MaxLengthValidator(100, message='The name can only have 100 characters')])
    cui = serializers.CharField(validators=[MinLengthValidator(13, message='The cui field must be least 13 characters long'), MaxLengthValidator(13, message='The cui field can only have 13 characters')])
    class Meta:
        model = Collaborator
        fields = ['id', 'name', 'cui']
