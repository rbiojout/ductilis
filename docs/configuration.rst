################################
Configuration
################################

*****************************************
Django Environments
*****************************************

different environments are used. They are located in the path **ductilis/ductilis/settings**
Default environment is local

Common informations are stored in the base.py file

* **local** is used for the local installation and for the development purpose. Debuging tools are set-up for this environment

* **development** is a production ready environment. It is intended to be used as a production-like environment for qualification

* **production** is the real production environment. It is not used so far

* **test** is for testing purpose


*****************************************
Configuration
*****************************************

the file **.env** contains information for the frontend. It must me rewritten for production
the file **.env.local** contains information for the frontend

the file **settings.ini** contains informations for Django and must be rewritten for production
the folder **.envs** is used to store settings informations for Django

the file **.npmrc** contains informations for font-awesome and must be hidden

