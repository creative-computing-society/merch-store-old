python manage.py migrate
python manage.py collectstatic --noinput
gunicorn --worker-class gevent --certfile=cert.pem --keyfile=privkey.pem --bind 0.0.0.0:3376 config.wsgi:application  --preload
