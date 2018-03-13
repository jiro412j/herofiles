from django.db import models
from model_controller.models import AbstractModelController
from safedelete.models import SafeDeleteModel, HARD_DELETE_NOCASCADE
from herofiles.apps.document_type.models import DocumentType

class DocumentField(AbstractModelController, SafeDeleteModel):
    _safedelete_policy = HARD_DELETE_NOCASCADE

    TEXT = 0
    NUMBER = 1
    DATE = 2

    DOCUMENTFIELD_CONDITION_CHOICES = (
        (TEXT, 'Text'),
        (NUMBER, 'Number'),
        (DATE, 'Date'),
    )

    OPTIONAL = 0
    REQUIRED = 1

    DOCUMENTFIELD_KEY_CHOICES = (
        (OPTIONAL, 'Optional'),
        (REQUIRED, 'Required'),
    )

    document_type = models.ForeignKey(DocumentType, on_delete=models.CASCADE, related_name='field')
    field_name = models.CharField(max_length=255, db_index=True, verbose_name='Field Name')
    condition = models.IntegerField(choices=DOCUMENTFIELD_CONDITION_CHOICES, verbose_name='Condition', db_index=True)
    key = models.IntegerField(choices=DOCUMENTFIELD_KEY_CHOICES, verbose_name='Key', db_index=True)

    class Meta:
        verbose_name = 'Document Field'