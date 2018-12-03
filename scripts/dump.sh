# Company
python manage.py dumpdata company.industry --format=json > ./fixtures/industry.json
python manage.py dumpdata company.sector --format=json > ./fixtures/sector.json
python manage.py dumpdata company.company --format=json > ./fixtures/company.json
python manage.py dumpdata company.earning --format=json > ./fixtures/earning.json
python manage.py dumpdata company.event --format=json > ./fixtures/event.json
# Exchange
python manage.py dumpdata exchange.provider --format=json > ./fixtures/provider.json
python manage.py dumpdata exchange.exchange --format=json > ./fixtures/exchange.json
python manage.py dumpdata exchange.ticker --format=json > ./fixtures/ticker.json
#python manage.py dumpdata exchange.tick --format=json > ./fixtures/AAPL_tick.json
