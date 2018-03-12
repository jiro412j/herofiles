from django.db import models
from django.db.models import signals
from model_controller.models import AbstractModelController
from herofiles.apps.commons.fields import LiveField
from herofiles.apps.commons.managers import SoftDeletionManager

class AbstractSoftDeletionModel(models.Model):
    """
    Soft delete mean that it not actually deleted from database but
    just change its' alive field to false. Then we override its'
    objects manager to only query object that alive is True.
    """
    alive = LiveField()

    # django will use the first encounter manager as a default manager (so ordering matter!!)
    objects = SoftDeletionManager()
    all_objects = SoftDeletionManager(alive_only=False)

    class Meta:
        abstract = True

    def delete(self, using=None):
        self.alive = None
        self.save()
        signals.post_delete.send(sender=self.__class__, instance=self)

    def hard_delete(self, using=None):
        super(AbstractSoftDeletionModel, self).delete(using=using)

    def undelete(self):
        self.alive = True
        self.save()


class AbstractSoftModelController(AbstractSoftDeletionModel, AbstractModelController):
    """
    Shortcut for mixing Soft Delete and Model Controller
    """

    class Meta:
        abstract = True


class AbstractSequence(models.Model):
    """
    This would allow user to sort to whatever they want
    """
    sequence = models.IntegerField(default=0, db_index=True, verbose_name='Sequence')

    class Meta:
        abstract = True
