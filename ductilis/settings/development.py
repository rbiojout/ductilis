from .base import *
from kombu import Queue, Exchange

print("IN DEVELOPMENT CONFIG")

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = config('DJANGO_SECRET_KEY', 'Wg2590HFq9nP7k7m8GZYtv1pleG0R5d2XOuS990BorWWxtBSidusjCNwdBm4pRfx')
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = config('DJANGO_ALLOWED_HOSTS', default=['*.amazonaws.com', '*.ductilis.com'])


MIDDLEWARE += ['whitenoise.middleware.WhiteNoiseMiddleware',]

CELERY_QUEUES = (
    Queue('high', Exchange('high'), routing_key='high'),
    Queue('celery', Exchange('celery'), routing_key='celery'),
    Queue('low', Exchange('low'), routing_key='low'),
)
CELERY_DEFAULT_QUEUE = 'celery'
CELERY_DEFAULT_EXCHANGE = 'celery'
CELERY_DEFAULT_ROUTING_KEY = 'celery'

#CELERY_ROUTES = {
    # -- HIGH PRIORITY QUEUE -- #
#    'myapp.tasks.check_payment_status': {'queue': 'high'},
    # -- LOW PRIORITY QUEUE -- #
#    'myapp.tasks.close_session': {'queue': 'low'},
#}


# use PROJECT_DIR to position the logs
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.FileHandler',
            'filename': PROJECT_DIR + '/var/logs/ductilis.log',
        },
    },
    'loggers': {
        'django': {
          'django.db.backends': {
            'level': 'ERRORS',
          },
          'handlers': ['file'],
            'level': 'WARNING',
            'propagate': True,
        },
    },
}
