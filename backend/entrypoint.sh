#!/bin/sh

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Start Gunicorn
exec gunicorn --bind 0.0.0.0:8000 portfolio.wsgi:application 