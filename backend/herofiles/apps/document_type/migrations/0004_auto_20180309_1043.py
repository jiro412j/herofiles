# Generated by Django 2.0.1 on 2018-03-09 10:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('document_type', '0003_auto_20180309_1042'),
    ]

    operations = [
        migrations.RenameField(
            model_name='documenttype',
            old_name='name',
            new_name='type_name',
        ),
    ]
