from django.db import models
from users.models import User

# Create your models here.
class Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event_name = models.CharField(max_length=100)
    data = models.CharField(max_length=500)
    time = models.DateTimeField()
    location = models.CharField(max_length=200)
    image = models.ImageField(blank=True, null=True)
    is_liked = models.ManyToManyField(User, default=None, blank=True, related_name='liked')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']