from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.AllOrders.as_view()),
    path('initiate/', views.initiateOrder.as_view()),
    path('post-payment', views.postPayment),
    path('redirect/', views.redirect),
    path('<slug:order_id>/', views.OrderView.as_view()),
]
