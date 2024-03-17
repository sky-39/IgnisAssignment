from rest_framework import serializers
from .models import Event

class MyEventSerializer(serializers.ModelSerializer):

    likes_count = serializers.SerializerMethodField(read_only=True)
    user = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Event
        fields = ['id', 
                'user', 'event_name', 'data', 'time', 'location',
                'image', 'is_liked', 'created_at', 'likes_count',]

    def get_likes_count(self, obj):
        return obj.is_liked.all().count()

    

class EventSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.email')

    likes_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Event
        fields = ['id',
                'user', 'event_name', 'data', 'time', 'location',
                'image', 'is_liked', 'created_at', 'likes_count',]



    def get_likes_count(self, obj):
        return obj.is_liked.all().count()

    def get_iliked(self, obj):
        return True if self.context['request'].user in obj.is_liked.all() else False
    