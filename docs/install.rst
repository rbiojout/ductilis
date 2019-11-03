Install
=========

This is where you write how to get a new laptop to run this project.

doc themen:
cf. https://sphinx-themes.org

sphinx_bootstrap_theme
crate-docs-theme
edx-sphinx-theme
sphinx-ustack-theme
sphinx_minoo_theme


*****************************************
Dependencies
*****************************************

Python dependencies are listed in the requirements.txt file

::
    pip install -r requirements.txt

to query the dependencies to update (make sure this is the right environement):
::
    pip list -o

to get the requirements
::
    pip freeze > requirements.txt


update all
::
    pip freeze | sed 's/==.*//' | xargs pip install -U
