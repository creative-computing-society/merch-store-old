from __future__ import absolute_import, unicode_literals

from config.celery import app

from django.conf import settings
from django.core.mail import EmailMultiAlternatives, get_connection
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from login.models import User

import os, csv, string
from random import choice

@app.task(name='add_users')
def add_users(filename):
    email_subject = 'User Credentials for CCS Merchandise Store'
    
    filename = os.path.join(settings.MEDIA_ROOT, filename)
    
    connection = get_connection(fail_silently=False)
    connection.open()
    
    userfile = open(filename, 'r', newline='', encoding='utf-8-sig')
    reader = csv.DictReader(userfile)
    
    for row in reader:
        password = ''.join(choice(string.ascii_letters) for _ in range(8))
        try:
            user = User(name=row['name'].strip(), email=row['email'].strip(), phone_no=row['phone'].strip(), position=row['position'].strip())
            user.set_password(password)
            user.save()
        except:
            with open(os.path.join(settings.LOGS_ROOT, 'add_user_errors.log'), 'a') as f:
                f.write(f"creation of ({row['name']}, {row['email']}, {row['phone']}) unsuccessful.\n")
            continue
        
        context = {
            'name': row['name'].strip(),
            'email': row['email'].strip(),
            'password': password
        }
        html_message = render_to_string('dashboard/email_login_credentials.html', context)
        msg = strip_tags(html_message)

        email = EmailMultiAlternatives(email_subject, msg, settings.EMAIL_HOST_USER, (row['email'],), reply_to=('ccs@thapar.edu',))
        email.attach_alternative(html_message, 'text/html')
        
        connection.send_messages((email,))
    
    connection.close()
    return 1
