from django.db import models
from datetime import datetime

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    technologies = models.JSONField(default=list)
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(default=datetime.utcnow)
    updated_at = models.DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'projects'

    def __str__(self):
        return self.title

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, default='')
    message = models.TextField()
    created_at = models.DateTimeField(default=datetime.utcnow)
    status = models.CharField(max_length=20, default='pending')

    class Meta:
        db_table = 'contacts'

    def __str__(self):
        return f"{self.name} - {self.email}"

class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    proficiency = models.IntegerField()
    
    class Meta:
        db_table = 'skills'

    def __str__(self):
        return self.name
