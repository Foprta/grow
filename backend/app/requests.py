from requests import Request, Session
import json

headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': 'be8d578e-76db-4896-ace0-663aac314963',
}


def get_logos(ids):
    session = Session()
    session.headers.update(headers)
    response = session.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', params={'id': ids, 'aux': 'logo'})
    session.close()



    return json.loads(response.text)


def get_coins():
    session = Session()
    session.headers.update(headers)
    response = session.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', params={'aux': ''})
    session.close()
    return json.loads(response.text)
