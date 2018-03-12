from rest_framework import routers
from herofiles.apps.document_field_list.views import DocumentFieldListViewSet
from herofiles.apps.document_type.views import DocumentTypeViewSet

router = routers.DefaultRouter()
router.register(r'document_field', DocumentFieldListViewSet, base_name='document_field')
router.register(r'document_setting', DocumentTypeViewSet, base_name='document_setting')

urlpatterns = []

urlpatterns += router.urls
