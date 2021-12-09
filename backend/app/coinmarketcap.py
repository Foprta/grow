from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
from app import db
from app.models import Coins

url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map'
parameters = {
  'aux':'',
  'limit':'10'
}
headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': 'be8d578e-76db-4896-ace0-663aac314963',
}

def get_coins():
    session = Session()
    session.headers.update(headers)

    try:
      response = session.get(url, params=parameters)
      data = json.loads(response.text)
      print(data)
      for coin in data['data']:
        print(coin['id'])
        new_coin = Coins(coin['id'],coin['name'],coin['symbol'],coin['slug'],coin['rank'])
        db.session.add(new_coin)
      db.session.commit()
    except (ConnectionError, Timeout, TooManyRedirects) as e:
      print(e)


