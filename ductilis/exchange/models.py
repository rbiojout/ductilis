from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from ductilis.company.models import Company



class Exchange(models.Model):
    DELTA_UTC = (
        (-11, '(-11) Midway, Pago Pago'),
        (-10, '(-10) Honolulu'),
        (-9, '(-9) Anchorage'),
        (-8, '(-8) Los Angeles'),
        (-7, '(-7) Denver'),
        (-6, '(-6) Chicago'),
        (-5, '(-5) New York'),
        (-4, '(-4) Santiago'),
        (-3, '(-3) Rio de Janero'),
        (-2, '(-2) Fernando de Noronha'),
        (-1, '(-1) Praia'),
        (0, '(0) UTC London'),
        (1, '(1) Paris, Berlin'),
        (2, '(2) Athen'),
        (3, '(3) Djeddah'),
        (4, '(4) Dubai'),
        (5, '(5) Karachi'),
        (6, '(6) Dhaka'),
        (7, '(7) Bangkok, Jakarta'),
        (8, '(8) Hong-Kong, Nanjing'),
        (9, '(9) Tokyo'),
        (10, '(10) Sidney'),
        (11, '(11) Noumea'),
        (12, '(12) Welligton'),
    )
    name = models.CharField(max_length=200, unique=True, null=False, blank=False)
    time_zone = models.IntegerField(choices=DELTA_UTC, default=0, validators=[MinValueValidator(-12), MaxValueValidator(12)])
    opening_time = models.DateTimeField('local opening time',null=True, blank=True)
    closing_time = models.DateTimeField('local closing time',null=True, blank=True)

    def __str__(self):
        return self.name

class Ticker(models.Model):
    symbol = models.CharField(max_length=200, unique=True)
    company = models.OneToOneField(Company, on_delete=models.PROTECT, related_name='ticker')
    exchange = models.ForeignKey(Exchange, on_delete=models.PROTECT, null=True, blank=True, related_name='tickers')

    @property
    def company_name(self):
        "Returns the company's name."
        return self.company__name

    class Meta:
        ordering = ['symbol']

    def __str__(self):
        return self.symbol


class Provider(models.Model):
    name = models.CharField(max_length=200, unique=True)
    home_url = models.CharField(max_length=200)
    api_url = models.CharField(max_length=200, blank=True)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class TickManager(models.Manager):
    def get_by_natural_key(self, ticker, date, provider):
        return self.get(ticker=ticker, date=date, provider=provider)


TICK_COLUMNS = ['date', 'open', 'high', 'low', 'close', 'volume', 'open_adj', 'high_adj', 'low_adj', 'close_adj', 'volume_adj', 'dividend', 'splits']
TICK_DEFAULT_PROVIDER = "yahoo"

# filter based on provider
class TickDefaultProviderManagerold(models.Manager):
    def get_queryset(self):
        default_provider = Provider.objects.get(name = TICK_DEFAULT_PROVIDER)
        try:
            return super().get_queryset()
        except:
            return super().get_queryset().filter(provider=default_provider)

class TickDefaultProviderManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(provider__name=TICK_DEFAULT_PROVIDER)

# used for fixtures
class TickSingleSymbolManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(ticker__symbol='AAPL').filter(date__gte='2010-01-01')

class Tick(models.Model):
    id = models.BigAutoField(primary_key=True)
    ticker = models.ForeignKey(Ticker, on_delete=models.CASCADE, related_name='ticker_ticks')
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='provider_ticks')
    date = models.DateField()
    open = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    close = models.FloatField()
    # some rare assets have huge volumes
    volume = models.BigIntegerField(default=0)
    open_adj = models.FloatField(null=True,)
    high_adj = models.FloatField(null=True,)
    low_adj = models.FloatField(null=True,)
    close_adj = models.FloatField(null=True,)
    # some rare assets have huge volumes
    volume_adj = models.BigIntegerField(null=True, default=0)
    dividend = models.FloatField(null=True, blank=True)
    splits = models.FloatField(null=True, blank=True)

    objects = models.Manager()  # The default manager.
    default_provider_objects = TickDefaultProviderManager()  # Specific manager for default provider.

    single_symbol_objects = TickSingleSymbolManager() # extract only for AAPL

    # second index as small as possible
    class Meta:
        default_manager_name = 'objects'
        unique_together = (
            'ticker',
            'provider',
            'date',
        )
        ordering = ['ticker', 'date', 'provider']
