from django.db import models
from model_controller.models import AbstractModelController
from safedelete.models import SafeDeleteModel, SOFT_DELETE_CASCADE

class DocumentType(AbstractModelController, SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    type_name = models.CharField(max_length=255, db_index=True, verbose_name='Type Name')
    detail = models.CharField(max_length=255, db_index=True, verbose_name='Detail')

    class Meta:
        verbose_name = 'Document Type'
