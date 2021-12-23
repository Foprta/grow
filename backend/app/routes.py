from app import app, db
from app.models import Users, Portfolio
from app.coinmarketcap import update_coins, search_coins
from app.users import new_user
from flask import request
import json
from app.portfolios import get_portfolio, update_portfolio


@app.route('/')
def index():
    return "HELLO MAN"

@app.route('/api/user/portfolios')
def get_portfolios():
    name = request.args.get('userId')
    res = get_portfolio(name)
    return res


@app.route('/api/user/portfolio', methods=["POST"])
def create_portfolio():
    update_portfolio(json.loads(request.data))
    return ""

@app.route('/api/user', methods=["POST"])
def user_create():
    return new_user()


# @app.route('/api/coin')
# def coin_create():
#     update_coins()
#     return "database successfully updated"


@app.route('/api/coins/search', methods=["GET"])
def coin_search():
    name = request.args.get('name')
    size = request.args.get('size')
    vivod = search_coins(name, size)
    return vivod
