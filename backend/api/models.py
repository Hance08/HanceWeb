from mongoengine import Document, StringField, EmailField, DateTimeField, IntField, ListField, URLField
from django.contrib.auth.models import User
from datetime import datetime

class Project(Document):
    title = StringField(max_length=200, required=True)
    description = StringField(required=True)
    image_url = URLField()
    technologies = ListField(StringField())
    github_url = URLField()
    live_url = URLField()
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {'collection': 'projects'}

    def __str__(self):
        return self.title

class Contact(Document):
    name = StringField(max_length=100, required=True)
    email = EmailField(required=True)
    message = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    status = StringField(default='pending')

    meta = {'collection': 'contacts'}

    def __str__(self):
        return f"{self.name} - {self.email}"

class Skill(Document):
    name = StringField(max_length=100, required=True)
    category = StringField(max_length=50, required=True)
    proficiency = IntField(min_value=1, max_value=5, required=True)
    
    meta = {'collection': 'skills'}

    def __str__(self):
        return self.name
