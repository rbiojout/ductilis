from django.db import models

from ductilis.exchange.models import Ticker


class Portfolio(models.Model):
    name = models.CharField(max_length=200)
    tickers = models.ManyToManyField(Ticker, through='WeightPortfolio', through_fields=('portfolio', 'ticker'), related_name='portfolios')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']

class WeightPortfolio(models.Model):
    portfolio = models.ForeignKey(Portfolio, null=False, related_name='weight_portfolios', on_delete=models.CASCADE)
    ticker = models.ForeignKey(Ticker, null=False, related_name='weight_portfolios', on_delete=models.CASCADE)
    weight = models.PositiveIntegerField(default=1)

    @property
    def symbol(self):
        "Returns the symbol ticker."
        return self.ticker.symbol
