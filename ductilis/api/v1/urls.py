from django.conf.urls import url, include
from django.urls import path

from ductilis.api.v1 import views

app_name = 'ductilis.api'

urlpatterns = [
  url('v1/', include(views)),
 ]
