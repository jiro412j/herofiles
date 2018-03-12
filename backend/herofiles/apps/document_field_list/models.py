from django.db import models
from model_controller.models import AbstractModelController
from safedelete.models import SafeDeleteModel, SOFT_DELETE

class DocumentFieldList(AbstractModelController, SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE

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

    field_name = models.CharField(max_length=255, db_index=True, verbose_name='Field Name')
    condition = models.IntegerField(choices=DOCUMENTFIELD_CONDITION_CHOICES, verbose_name='Condition', db_index=True)
    key = models.IntegerField(choices=DOCUMENTFIELD_KEY_CHOICES, verbose_name='Key', db_index=True)

    class Meta:
        verbose_name = 'Document Field List'