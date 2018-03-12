from model_controller.serializers import ModelControllerSerializer
from model_controller.utils import EXCLUDE_MODEL_CONTROLLER_FIELDS
from herofiles.apps.document_field.models import DocumentField

class DocumentFieldSerializer(ModelControllerSerializer):
    class Meta:
        model = DocumentField
        exclude = EXCLUDE_MODEL_CONTROLLER_FIELDS + ('deleted', 'type', 'id')
