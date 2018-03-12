from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from herofiles.apps.document_field_list.serializers import DocumentFieldListSerializer
from herofiles.apps.document_field_list.models import DocumentFieldList

class DocumentFieldListViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentFieldListSerializer
    queryset = DocumentFieldList.objects.all()
    permission_classes = (IsAuthenticated,)
    pagination_class = None
