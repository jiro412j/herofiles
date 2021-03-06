from model_controller.serializers import ModelControllerSerializer
from model_controller.utils import EXCLUDE_MODEL_CONTROLLER_FIELDS
from django.db import transaction
from herofiles.apps.document_type.models import DocumentType
from herofiles.apps.document_field.models import DocumentField
from herofiles.apps.document_field.serializers import DocumentFieldSerializer

class DocumentTypeSerializer(ModelControllerSerializer):
    field = DocumentFieldSerializer(many=True)

    class Meta:
        model = DocumentType
        exclude = EXCLUDE_MODEL_CONTROLLER_FIELDS + ('deleted',)

    def create(self, validated_data):
        with transaction.atomic():
            fields_data = validated_data.pop('field')
            request_data = super().create(validated_data)

            user = self.context['request'].user
            for field_data in fields_data:
                DocumentField.objects.create(document_type=request_data, created_user=user, updated_user=user, **field_data)
            return request_data

    def update(self, instance, validated_data):
        with transaction.atomic():
            fields_data = validated_data.pop('field')
            request_data = super().update(instance, validated_data)

            user = self.context['request'].user
            fields = instance.field.all()
            fields.delete()
            for field_data in fields_data:
                DocumentField.objects.create(document_type=request_data, created_user=user, updated_user=user, **field_data)
            return request_data
