from django.db import models
from herofiles.apps.commons.models import AbstractSoftModelController
from herofiles.apps.document_type.models import DocumentType

class DocumentField(models.Model):
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

    type = models.ForeignKey(DocumentType, on_delete=models.CASCADE, related_name='field')
    field_name = models.CharField(max_length=255, db_index=True, verbose_name='Field Name')
    condition = models.IntegerField(choices=DOCUMENTFIELD_CONDITION_CHOICES, verbose_name='Condition', db_index=True)
    key = models.IntegerField(choices=DOCUMENTFIELD_KEY_CHOICES, verbose_name='Key', db_index=True)

    class Meta:
        verbose_name = 'Document Field'