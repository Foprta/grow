from flask_restful import abort
from app import app
from app.coinmarketcap import search_coins
from app.users import new_user
from app.transaction import new_transaction
from flask import request
import json
from app.portfolios import get_portfolio, new_portfolio
from app.auth import create_jwt, new_auth, login_required


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
    new_portfolio(json.loads(request.data))
    return ""


@app.route('/api/user', methods=["POST"])
def user_create():
    new_user(json.loads(request.data))
    return ""


@app.route('/api/user/portfolio/<portfolio_id>/transaction', methods=["POST"])
@login_required
def add_transaction_to_portfolio(portfolio_id, token):
    new_transaction(json.loads(request.data), int(portfolio_id))
    return ""





@app.route('/api/coins/search', methods=["GET"])
def coin_search():
    name = request.args.get('name')
    size = request.args.get('size')
    vivod = search_coins(name, size)
    return vivod


@app.route('/api/login/1', methods=["POST"])
def login_first_step():
    return str(new_auth(json.loads(request.data)).random)


@app.route('/api/login/2', methods=["POST"])
def login_second_step():
    return create_jwt(json.loads(request.data))
