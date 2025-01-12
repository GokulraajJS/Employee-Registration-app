from django.shortcuts import render
from rest_framework import viewsets
from backend.models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny

from django.contrib.auth.models import Group
from rest_framework.response import Response


# Create your views here.
class CustomUserViewSet(viewsets.ModelViewSet):
    # queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        # Get the group instance for 'EMPLOYEE'
        try:
            employees_group = Group.objects.get(name='EMPLOYEE')
        except Group.DoesNotExist:
            # Return an empty response if the group does not exist
            return Response({'data': []})

        # Filter users by the 'EMPLOYEE' group
        queryset = CustomUser.objects.filter(groups=employees_group)

        # Serialize the queryset
        serializer = self.get_serializer(queryset, many=True)

        # Return the response with custom data structure
        data = {
            'data': serializer.data
        }
        return Response(data)