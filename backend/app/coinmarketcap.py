from sqlalchemy import func, or_
from app import db
from app.models import Coins
from app.requests import get_logos, get_coins
from time import sleep


def update_coins():
    Coins.query.delete()

    data = get_coins()

    ids = []

    for coin in data['data']:
        ids.append(coin['id'])

    size = 300

    logos = {}

    for i in range(0, int(len(ids)/size + 1)):
        sleep(5)
        strIds = ','.join(str(id) for id in ids[i*size:(i+1)*size])
        result = get_logos(strIds)
        logos.update(result['data'])

    for coin in data['data']:
        id = coin['id']

        new_coin = Coins(str(id),
                         coin['name'],
                         coin['symbol'],
                         coin['slug'],
                         coin['rank'],
                         logos[str(id)]['logo'])

        db.session.add(new_coin)
    db.session.commit()
    return "success"


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
