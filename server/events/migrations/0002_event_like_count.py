# Generated by Django 3.2.25 on 2024-03-15 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='like_count',
            field=models.IntegerField(default=0),
        ),
    ]
