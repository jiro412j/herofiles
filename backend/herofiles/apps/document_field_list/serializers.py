from model_controller.serializers import ModelControllerSerializer
from model_controller.utils import EXCLUDE_MODEL_CONTROLLER_FIELDS
from django.db import transaction
from herofiles.apps.document_field_list.models import DocumentFieldList

class DocumentFieldListSerializer(ModelControllerSerializer):
    class Meta:
        model = DocumentFieldList
        exclude = EXCLUDE_MODEL_CONTROLLER_FIELDS + ('deleted',)

    def create(self, validated_data):
        with transaction.atomic():
            request_data = super().create(validated_data)
            return request_data
