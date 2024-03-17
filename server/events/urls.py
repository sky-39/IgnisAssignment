from django.urls import path
from . import views

urlpatterns = [
    path('', views.EventList.as_view()),
    path('<int:pk>/', views.EventDetail.as_view()),
    path('my/<str:email>/', views.get_user_events),
    path('like/<int:pk>/', views.like),
    path('likes/<str:email>/', views.get_user_likes),
]