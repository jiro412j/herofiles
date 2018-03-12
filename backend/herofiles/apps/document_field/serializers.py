from model_controller.serializers import ModelControllerSerializer
from herofiles.apps.document_field.models import DocumentField

class DocumentFieldSerializer(ModelControllerSerializer):
    class Meta:
        model = DocumentField
        exclude = ('type', 'id')
