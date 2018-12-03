from django.apps import AppConfig


class UsersAppConfig(AppConfig):

    name = "ductilis.users"
    verbose_name = "Users"

    def ready(self):
        try:
            from ductilis import users
        except ImportError:
            pass
