from bulk_update.manager import BulkUpdateManager
from herofiles.apps.commons.querysets import SoftDeletionQuerySet

class SoftDeletionManager(BulkUpdateManager):
    use_for_related_fields = True

    def __init__(self, *args, **kwargs):
        self.alive_only = kwargs.pop('alive_only', True)
        super(SoftDeletionManager, self).__init__(*args, **kwargs)

    def get_queryset(self):
        if self.alive_only:
            return SoftDeletionQuerySet(self.model).alive()
        return SoftDeletionQuerySet(self.model)

    def hard_delete(self):
        return self.get_queryset().hard_delete()

    def cascade_delete(self):
        return self.get_queryset().cascade_delete()

    def undelete(self):
        return self.get_queryset().undelete()

    def cascade_undelete(self):
        return self.get_queryset().cascade_undelete()
