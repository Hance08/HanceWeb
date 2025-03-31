from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.mail import send_mail
from django.conf import settings
from .models import Project, Contact, Skill
from .serializers import ProjectSerializer, ContactSerializer, SkillSerializer, UserSerializer

# Create your views here.

class ProjectViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            project = Project.objects.get(id=pk)
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response(status=404)

    @action(detail=False, methods=['get'])
    def by_technology(self, request):
        technology = request.query_params.get('tech', None)
        if technology:
            projects = Project.objects.filter(technologies=technology)
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data)
        return Response([])

class ContactViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            contact = Contact(**serializer.validated_data)
            contact.save()
            
            # Send email notification
            send_mail(
                f'New Contact Form Submission from {contact.name}',
                f'Message: {contact.message}\nFrom: {contact.email}',
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],
                fail_silently=False,
            )
            
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class SkillViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        skills = Skill.objects.all()
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category = request.query_params.get('category', None)
        if category:
            skills = Skill.objects.filter(category=category)
            serializer = SkillSerializer(skills, many=True)
            return Response(serializer.data)
        return Response([])
