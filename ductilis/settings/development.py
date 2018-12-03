from .base import *

print("IN DEVELOPMENT CONFIG")

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = config('DJANGO_SECRET_KEY', 'Wg2590HFq9nP7k7m8GZYtv1pleG0R5d2XOuS990BorWWxtBSidusjCNwdBm4pRfx')
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = config('DJANGO_ALLOWED_HOSTS', default=['*.amazonaws.com', '*.ductilis.com'])


MIDDLEWARE += ['whitenoise.middleware.WhiteNoiseMiddleware',]
