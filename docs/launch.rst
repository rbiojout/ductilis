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
Backend with Jupyter
=====================

activate the venv
launch django
::
    source venv/bin/activate
    ./manage.py shell_plus --notebook

=====================
Celery worker
=====================

activate the venv
launch the celery environment with a beat
::
    source venv/bin/activate
    celery -A ductilis worker -E -l info -Q celery -B --scheduler django_celery_beat.schedulers:DatabaseScheduler

make sure to have the right paths added in the notebook

::
    import sys
    sys.path
    from pathlib import Path
    home = str(Path.home())
    code_base = '/code'

    sys.path.insert(0, home + code_base + "/ductilis/")
    sys.path.insert(0, home + code_base + "/computation/")

=====================
The frontend
=====================
launch the front
::
    yarn start


*****************************************
Production
*****************************************
