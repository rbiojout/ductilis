from celery.task.schedules import crontab
from celery.decorators import periodic_task

from celery.decorators import task
from celery.utils.log import get_task_logger

from ductilis.exchange.providers import iex_call, yahoo_call, quandl_call

#@periodic_task(run_every=(crontab(minute='*/15')), name="call_iex", ignore_result=True)
@task(name="call_iex")
def call_iex_task():
    return iex_call.build_companies()

@task(name="call_quandl")
def call_quandl_task():
    database_name = 'WIKI'

    database_meta = quandl_call.query_data(database_name=database_name)

    print("DATA code :", database_meta['code'])

    ticker = database_meta['code'][10]

    quandl_call.fill_ticks(database_name, ticker)
    return {}


@task(name="call_yahoo")
def call_yahoo_task():
    return yahoo_call.create_tickers()
