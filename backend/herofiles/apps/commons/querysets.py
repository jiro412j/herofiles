from django.contrib.admin.utils import NestedObjects
from django.db import DEFAULT_DB_ALIAS
from django.db.models.query import QuerySet

class SoftDeletionQuerySet(QuerySet):
    def delete(self):
        # Bulk delete bypasses individual objects' delete methods.
        return super(SoftDeletionQuerySet, self).update(alive=False)

    # soft delete all related objects that also subclass SoftDeletionModel
    # ignore those that don't
    def cascade_delete(self, collection=None):
        if not collection:
            collector = NestedObjects(using=DEFAULT_DB_ALIAS)
            collector.collect(self)
            collection = collector.nested()
        try:
            collection.active = False
            collection.save()
        except AttributeError:
            try:
                for x in collection:
                    self.cascade_delete(x)
            except TypeError:
                pass

    def hard_delete(self):
        return super(SoftDeletionQuerySet, self).delete()

    def undelete(self):
        return super(SoftDeletionQuerySet, self).update(active=True)

    def alive(self):
        return self.filter(alive=True)

    def dead(self):
        return self.exclude(alive=True)

    def cascade_undelete(self, collection=None):
        if not collection:
            collector = NestedObjects(using=DEFAULT_DB_ALIAS)
            collector.collect(self)
            collection = collector.nested()
        try:
            collection.undelete()
        except AttributeError:
            try:
                for x in collection:
                    self.cascade_undelete(x)
            except TypeError:
                pass
