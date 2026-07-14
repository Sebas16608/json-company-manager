from .views import CompaniesView, ImportCompanyAPIView, BranchViewSet, CollaboratorViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"companies", CompaniesView, basename="companies")
router.register('branches', BranchViewSet)
router.register('collaborators', CollaboratorViewSet)

urlpatterns = [
    path("companies/import/", ImportCompanyAPIView.as_view(), name="company-import"),
    path("", include(router.urls))
]
