from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
from sqlalchemy import func, or_
from app import db
from app.models import Coins

url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map'
parameters = {
    'aux': '',
}
headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': 'be8d578e-76db-4896-ace0-663aac314963',
}


def get_coins():
    session = Session()
    session.headers.update(headers)
    Coins.query.delete()
    try:
        response = session.get(url, params=parameters)
        data = json.loads(response.text)
        for coin in data['data']:
            new_coin = Coins(coin['id'],
                             coin['name'],
                             coin['symbol'],
                             coin['slug'],
                             coin['rank'])
            db.session.add(new_coin)
        db.session.commit()
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        print(e)


def search_coins(name, size):
    if name is None:
        name = ""
    if size is None:
        size = 10

    result = Coins.query.filter(
        or_(
            func.lower(Coins.name).startswith(name.lower()),
            func.lower(Coins.slug).startswith(name.lower()),
            func.lower(Coins.symbol).startswith(name.lower())
        )
    ).limit(size)

    res = {'coins': []}
    for coin in result.all():
        res['coins'].append(coin.as_dict())

    return res
