from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from django.contrib.auth import authenticate

from .serializers import UserSerializer
import jwt
# Create your views here.


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
        token = Token.objects.get_or_create(user=user)

        data = {
            'key': token[0].key,
            'name': user.name,
            'email': user.email
        }

        return Response(data, status=status.HTTP_200_OK)


class LoginTokenView(APIView):
    # print("HELLOs")
    def post(self, request):
        token = request.data.get('token')
        try:
            jwt_secret = "4edbe025e8212f08bdb94a2d3e065c980cd2893f1b844765c76847a9ecead3365bc0025d264cf0a9dc9f04ac3fc2edfb"
            if token is None:
                return Response({'error': 'Token not found'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                return Response({'error': 'Token Expired'}, status=status.HTTP_400_BAD_REQUEST)
            except jwt.InvalidTokenError:
                return Response({'error': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)
            
            email = payload['email']
            # this is a sign in from sso create user if not exists
            first_name,last_name = payload['name'].split(' ')
            user = User.objects.get(email=email,first_name=first_name,last_name=last_name,username=email)
            # print(user,created)

            if user is None:
                return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
            
            token = Token.objects.get_or_create(user=user)

            data = {
                'key': token[0].key,
                'name': user.name,
                'email': user.email
            }

            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
    


class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        user = request.user
        user = authenticate(request, email=user.email, password=old_password)
        if user is None:
            return Response({'error': 'Incorrect Password'}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        return Response(status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response(status=status.HTTP_200_OK)


class UserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)