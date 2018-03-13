from .base import *


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'z+#2rc)$m1i45bs$qf^=j)gp9egaxl@g_4^(3=!xosmksq7qqg'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Database configuration
DATABASES = {
    'default': env.db("DATABASE_URL", default="postgres://postgres:postgres@localhost:5432/herofiles")
}
DATABASES['default']['ATOMIC_REQUESTS'] = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'