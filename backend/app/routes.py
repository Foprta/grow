from app import app, db
from app.models import Users
from app.coinmarketcap import get_coins, search_coins
from flask import request


@app.route('/')
def index():
    return "HELLO MAN"


@app.route('/api/user', methods=["POST"])
def user_create():
    user = Users()
    db.session.add(user)
    db.session.commit()
    return user.id


@app.route('/api/coin')
def coin_create():
    get_coins()
    return "database successfully updated"


@app.route('/api/coins/search', methods=["GET"])
def coin_search():
    name = request.args.get('name')
    size = request.args.get('size')
    vivod = search_coins(name, size)
    return vivod
