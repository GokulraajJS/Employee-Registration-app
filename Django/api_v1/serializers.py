from rest_framework import serializers
from backend.models import CustomUser

from django.contrib.auth.models import Group

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'gender',
            'password',
            'phone',
            'department',
            'position',
            'hire_date'
        ]

    def create(self, validated_data):
        user = super(CustomUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        group = Group.objects.get(name='EMPLOYEE')
        user.groups.add(group)
        user.is_staff = True
        user.is_active = True
        user.save()
        return user
