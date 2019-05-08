################################
Launch
################################

*****************************************
Local
*****************************************

Two different systems need to be launched.

=====================
The backend
=====================

activate the venv
launch django
::
    source venv/bin/activate
    ./manage.py runserver


=====================
Celery worker
=====================

activate the venv
launch the celery environment
::
    source venv/bin/activate
    ./manage.py runserver


=====================
The frontend
=====================
launch the front
::
    yarn start


*****************************************
Production
*****************************************
