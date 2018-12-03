from django.conf.urls import include, url
from django.urls import path

from rest_framework import routers
from rest_framework_extensions.routers import ExtendedSimpleRouter

from ductilis.api.v1.api import PortfolioViewSet, WeightPortfolioViewSet, TickerViewSet, TickViewSet, ticks_list

router = ExtendedSimpleRouter()

(
    router.register(r'portfolios', PortfolioViewSet, base_name='portfolio')
          .register(r'weight_portfolios',
                    WeightPortfolioViewSet,
                    base_name='portfolios-weight_portfolios',
                    parents_query_lookups=['portfolio']),

    router.register(r'tickers', TickerViewSet, base_name='ticker')
          .register(r'ticks',
                    TickViewSet,
                    base_name='tickers-ticks',
                    parents_query_lookups=['ticker__symbol'])
)



urlpatterns = [
    url("^", include(router.urls)),
]

