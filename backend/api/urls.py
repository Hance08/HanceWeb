from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ProjectViewSet, ContactViewSet, SkillViewSet, health_check

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'contacts', ContactViewSet, basename='contact')
router.register(r'skills', SkillViewSet, basename='skill')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('health/', health_check, name='health_check'),
] 