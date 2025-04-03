from rest_framework import serializers
from .models import Project, Contact, Skill
from django.contrib.auth.models import User

class ProjectSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(max_length=200)
    description = serializers.CharField()
    image_url = serializers.URLField(required=False)
    technologies = serializers.ListField(child=serializers.CharField())
    github_url = serializers.URLField(required=False)
    live_url = serializers.URLField(required=False)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

class ContactSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    subject = serializers.CharField(max_length=200, required=False, default='')
    message = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)
    status = serializers.CharField(read_only=True)
    
    def create(self, validated_data):
        return Contact.objects.create(**validated_data)
        
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.subject = validated_data.get('subject', instance.subject)
        instance.message = validated_data.get('message', instance.message)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

class SkillSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    category = serializers.CharField(max_length=50)
    proficiency = serializers.IntegerField(min_value=1, max_value=5)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
        extra_kwargs = {'password': {'write_only': True}} 