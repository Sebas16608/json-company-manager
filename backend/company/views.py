from django.db.models import QuerySet
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from .serializers import CompanySerializer, BranchSerializer, CollaboratorSerializer
from .service import ImportCompanyService
from .models import Company, Branch, Collaborator


class CompaniesView(viewsets.ModelViewSet):
    serializer_class=CompanySerializer

    def get_queryset(self) -> QuerySet[Company]: # type: ignore
        return Company.objects.prefetch_related("branches__collaborators")


class ImportCompanyAPIView(APIView):
    def post(self, request):
        file = request.FILES.get('file')

        if not file:
            return Response({'error': 'JSON file is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            company: Company = ImportCompanyService.execute(file)

            return Response({'message': 'Company imported successfully',
                'company_id': company.id}, status=status.HTTP_201_CREATED) # type: ignore
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



class BranchViewSet(ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer


class CollaboratorViewSet(ModelViewSet):
    queryset = Collaborator.objects.all()
    serializer_class = CollaboratorSerializer
