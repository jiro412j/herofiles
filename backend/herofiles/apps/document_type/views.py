from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from herofiles.apps.document_type.serializers import DocumentTypeSerializer
from herofiles.apps.document_type.models import DocumentType

class DocumentTypeViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentTypeSerializer
    queryset = DocumentType.objects.all()
    permission_classes = (IsAuthenticated,)
    pagination_class = None
