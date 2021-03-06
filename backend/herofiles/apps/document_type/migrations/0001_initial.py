# Generated by Django 2.0.1 on 2018-03-12 08:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DocumentType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deleted', models.DateTimeField(editable=False, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('type_name', models.CharField(db_index=True, max_length=255, verbose_name='Type Name')),
                ('detail', models.CharField(db_index=True, max_length=255, verbose_name='Detail')),
                ('created_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='documenttype_created_user', to=settings.AUTH_USER_MODEL, verbose_name='Created User')),
                ('updated_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='documenttype_updated_user', to=settings.AUTH_USER_MODEL, verbose_name='Updated User')),
            ],
            options={
                'verbose_name': 'Document Type',
            },
        ),
    ]
