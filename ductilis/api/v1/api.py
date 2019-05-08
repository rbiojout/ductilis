from rest_framework import status
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import authentication_classes, permission_classes, action
from rest_framework.permissions import AllowAny

from django.shortcuts import get_object_or_404

from ductilis.api.v1.serializers import TickerSerializer, TickSerializer, PortfolioSerializer, WeightPortfolioSerializer
from ductilis.exchange.models import Ticker, Tick, Provider
from ductilis.simulation.models import Portfolio, WeightPortfolio


from rest_framework_extensions.mixins import NestedViewSetMixin

class PortfolioViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    model = Portfolio
    # use prefetch to speed-up requests
    queryset = Portfolio.objects.all().prefetch_related('tickers')
    permission_classes = [permissions.AllowAny, ]
    serializer_class = PortfolioSerializer

    def create(self, request, *args, **kwargs):
        permission_classes = (AllowAny,)
        portfolio = Portfolio()
        serializer = PortfolioSerializer(data=request.data)
        if serializer.is_valid():
            portfolio.name=serializer.data['name']
            portfolio.save()
            # send back the result of the persisted object
            serializer = PortfolioSerializer(portfolio)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class WeightPortfolioViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    model = WeightPortfolio
    queryset = WeightPortfolio.objects.all()
    serializer_class = WeightPortfolioSerializer
    permission_classes = (AllowAny,)

    # Make sure we have a unique weight_portfolio associated to couple (portfolio, ticker)
    def create(self, request, *args, **kwargs):
        serializer = WeightPortfolioSerializer(data=request.data)
        if serializer.is_valid():
            portfolio_id = serializer.data['portfolio']
            ticker_id = serializer.data['ticker']
            weight = serializer.data['weight']

            # look if already created
            existingWeight = WeightPortfolio.objects.filter(portfolio=portfolio_id, ticker=ticker_id).all()
            if (len(existingWeight) > 0):
                # update only the weight
                existingWeight[0].weight = weight
                existingWeight[0].save()
                serializer = WeightPortfolioSerializer(existingWeight[0], many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            # create new one
            # get the objects
            portfolio = Portfolio.objects.get(id=portfolio_id)
            ticker = Ticker.objects.get(id=ticker_id)

            weightPortfolio = WeightPortfolio(portfolio=portfolio, ticker=ticker, weight=weight)
            weightPortfolio.save()
            # send back the result of the persisted object
            serializer = WeightPortfolioSerializer(weightPortfolio)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


class TickerViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    # use prefetch to speed-up requests
    queryset = Ticker.objects.all().prefetch_related('company').prefetch_related('exchange')
    permission_classes = [permissions.AllowAny, ]
    serializer_class = TickerSerializer
    lookup_field = 'symbol'


class TickViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    # use prefetch to speed-up requests
    # when first start take care of empty DB
    queryset = Tick.default_provider_objects.all()
    #queryset = Tick.objects.all()

    permission_classes = [permissions.AllowAny, ]
    serializer_class = TickSerializer


@api_view(['GET'])
def ticks_list(request, tickerSymbol):
    """
    List all ticks for a ticker symbol.
    """
    if request.method == 'GET':
      try:
        ticker = Ticker.objects.get(symbol= tickerSymbol)
        company = ticker.company
        provider = Provider.objects.get(name= 'yahoo')
        ticks = Tick.objects.filter(company= company, provider=provider).order_by('date')
        serializer = TickSerializer(ticks, many=True)
        return Response(serializer.data)
      except Exception as e:
          print(e)
          return Response(None, status=status.HTTP_400_BAD_REQUEST)

