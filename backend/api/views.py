from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.mail import send_mail
from django.conf import settings
import logging
from .models import Project, Contact, Skill
from .serializers import ProjectSerializer, ContactSerializer, SkillSerializer, UserSerializer

# 設置日誌記錄
logger = logging.getLogger(__name__)

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
        """處理聯絡表單提交"""
        # 記錄收到的請求數據以便調試
        logger.debug(f"Received contact form data: {request.data}")
        
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # 使用序列化器的 save 方法創建聯絡記錄
                contact = serializer.save()
                
                # 記錄成功提交的表單
                logger.info(f"Contact form submitted by {contact.name} ({contact.email})")
                
                # 發送電子郵件通知
                subject = f'新的聯絡表單提交: {contact.subject}'
                message = f"""
收到來自 {contact.name} 的新訊息

電子郵件: {contact.email}
主題: {contact.subject}

訊息內容:
{contact.message}
                """
                
                try:
                    send_mail(
                        subject,
                        message,
                        settings.DEFAULT_FROM_EMAIL,
                        [settings.ADMIN_EMAIL],
                        fail_silently=False,
                    )
                except Exception as e:
                    # 記錄電子郵件發送錯誤，但不影響API響應
                    logger.error(f"Failed to send email notification: {str(e)}")
                
                # 返回成功响應
                return Response({
                    'success': True,
                    'message': '您的訊息已成功送出！感謝您的聯繫。',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                logger.error(f"Error saving contact form: {str(e)}")
                return Response({
                    'success': False,
                    'message': '提交表單時發生錯誤，請稍後再試。',
                    'error': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # 記錄表單驗證錯誤
        logger.warning(f"Contact form validation failed: {serializer.errors}")
        
        # 返回表單驗證錯誤
        return Response({
            'success': False,
            'message': '請檢查表單中的錯誤並再試一次。',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

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
