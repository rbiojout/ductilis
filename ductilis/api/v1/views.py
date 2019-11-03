from django.conf.urls import include, url
from rest_framework.authtoken import views
from django.urls import path

from rest_framework import routers
from rest_framework_extensions.routers import ExtendedSimpleRouter

from ductilis.api.v1.api import PortfolioViewSet, WeightPortfolioViewSet, TickerViewSet, TickViewSet, ticks_list

router = ExtendedSimpleRouter()
(
    router.register(r'portfolios', PortfolioViewSet, base_name='portfolio')
          .register(r'weight_portfolios',
                    WeightPortfolioViewSet,
                    basename='portfolios-weight_portfolios',
                    parents_query_lookups=['portfolio']),

    router.register(r'tickers', TickerViewSet, base_name='ticker')
          .register(r'ticks',
                    TickViewSet,
                    basename='tickers-ticks',
                    parents_query_lookups=['ticker__symbol'])
)



urlpatterns = [
    url("^", include(router.urls)),
    url(r'^auth/', views.obtain_auth_token, name='auth')
]

