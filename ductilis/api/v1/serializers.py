from rest_framework import serializers

from ductilis.exchange.models import Ticker, Tick


class TickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticker
        fields = ('id', 'symbol', 'company', 'exchange')




class TickSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tick
        fields = ('date', 'open', 'high', 'low', 'close', 'volume', 'id' )
