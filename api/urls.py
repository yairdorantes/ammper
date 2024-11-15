from django.urls import path
from .views import   LoginView, MyTokenObtainPairView, ProtectedView, UserRegistrationView
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt import views as jwt_views 

urlpatterns = [
    path("login", csrf_exempt(LoginView.as_view()),name="login"),
    path("signup/", csrf_exempt(UserRegistrationView.as_view()),name="signup"),
      path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # JWT refresh token view
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    # A protected API view that requires a valid token
    path('protected/', ProtectedView.as_view(), name='protected_view'),
    # path('', include('app.urls')), 
]