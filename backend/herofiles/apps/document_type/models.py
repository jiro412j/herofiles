from django.db import models
from herofiles.apps.commons.models import AbstractSoftModelController

class DocumentType(AbstractSoftModelController):
    type_name = models.CharField(max_length=255, db_index=True, verbose_name='Type Name')
    detail = models.CharField(max_length=255, db_index=True, verbose_name='Detail')

    class Meta:
        verbose_name = 'Document Type'
