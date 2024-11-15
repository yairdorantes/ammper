# serializers.py
from rest_framework.serializers import Serializer, CharField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # username_field = User.EMAIL_FIELD
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        #   token['email'] = user.email
        #   token['score'] = user.score
        # ...

        return token

class UserRegistrationSerializer(Serializer):
    username = CharField(required=True, max_length=150)
    password = CharField(write_only=True, required=True, min_length=4)

    def create(self, validated_data):
        # Create user using Django's create_user method
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )