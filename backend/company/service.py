import json
from django.db import transaction

from .models import Company, Branch, Collaborator

class ImportCompanyService:
    @staticmethod
    @transaction.atomic
    def execute(file):
        data = json.load(file)
        empresa = data.get('empresa')

        if empresa is None:
            raise ValueError('The JSON does not contain the "empresa" key.')

        company = Company.objects.create(
            name=empresa['nombre'],
            country=empresa['pais']
        )

        for branch_data in empresa['sucursales']:
            branch = Branch.objects.create(
                company=company,
                name=branch_data["nombre"],
                address=branch_data["direccion"],
                phone=branch_data["telefono"]
            )

            for collaborator_data in branch_data['colaboradores']:
                Collaborator.objects.create(
                    branch=branch,
                    name=collaborator_data['nombre'],
                    cui=collaborator_data['CUI']
                )
        return company
