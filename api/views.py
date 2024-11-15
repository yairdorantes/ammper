from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View
from api.serializers import  MyTokenObtainPairSerializer, UserRegistrationSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny

# Create your views here.

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
class LoginView(View):

    def get(self, request):
        return HttpResponse("ok")
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class ProtectedView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Require authentication for this view

    def get(self, request):
        content = {'message': 'This is a protected view, you have access!'}
        return Response(content)
    

# API view for user registration

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                return JsonResponse(
                    {"message": "User created successfully!", "username": user.username},
                    status=201
                )
            except IntegrityError as e:
                # Check if the error is due to the UNIQUE constraint on the username
                if 'auth_user.username' in str(e):
                    return JsonResponse(
                        {"error": "A user with this username already exists."},
                        status=400
                    )
                # Generic response for other IntegrityErrors
                return JsonResponse(
                    {"error": "An unexpected error occurred during user creation."},
                    status=500
                )
        return HttpResponse(serializer.errors, status=400)
