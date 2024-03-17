from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .permissions import IsUserOrReadOnly
from . models import Event
from users.models import User
from . serializers import EventSerializer, MyEventSerializer

from django.shortcuts import render

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_likes(request, email):
    user = User.objects.get(email=email)
    events = Event.objects.filter(is_liked=user)
    serializer = MyEventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like(request, pk):
    event = Event.objects.get(pk=pk)
    if request.user in event.is_liked.all():
        event.is_liked.remove(request.user)
    else:
        event.is_liked.add(request.user)
    return Response({'status': 'ok'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_events(request, email):
    user = User.objects.get(email=email)
    events = Event.objects.filter(user=user)
    serializer = MyEventSerializer(events, many=True)
    return Response(serializer.data)


class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]