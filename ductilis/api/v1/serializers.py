from rest_framework import serializers

from ductilis.exchange.models import Ticker, Tick
from ductilis.simulation.models import Portfolio, WeightPortfolio




class WeightPortfolioSerializer(serializers.ModelSerializer):
    #ticker = serializers.StringRelatedField(many=False)

    class Meta:
        model = WeightPortfolio
        fields = ('id', 'portfolio', 'ticker', 'weight', 'symbol')

class PortfolioSerializer(serializers.ModelSerializer):
    weight_portfolio = WeightPortfolioSerializer(many=True, read_only=True)
    class Meta:
        model = Portfolio
        fields = ('id', 'name', 'weight_portfolio')

class TickSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tick
        fields = ('id', 'date', 'open', 'high', 'low', 'close', 'volume' )

class TickerSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField(many=False)
    exchange = serializers.StringRelatedField(many=False)

    class Meta:
        model = Ticker
        fields = ('id', 'symbol', 'company', 'exchange')
        lookup_field = 'symbol'
