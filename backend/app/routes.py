from app import app
from app.coinmarketcap import search_coins, update_coins
from app.transaction import new_transaction, get_transactions, get_tokens, get_token
from flask import request
import json
from app.portfolios import get_portfolios, new_portfolio, get_coins
from app.auth import create_jwt, new_auth, login_required
from os import environ
import werkzeug
from werkzeug.wrappers.request import Request
from werkzeug.exceptions import HTTPException, NotFound

#@app.errorhandler(Exception)
#def handle_bad_request(e):
#    print(e)
#    return e, 400


@app.route('/')
def index():
    return "HELLO MAN"


@app.route('/api/secured/user/portfolios')
@login_required
def get_user_portfolios(token):
    return get_portfolios(token['address'])


@app.route('/api/secured/user/portfolio', methods=["POST"])
@login_required
def create_portfolio(token):
    return new_portfolio(json.loads(request.data), token['address'])

@app.route('/api/secured/user/portfolio/<portfolio_id>/transactions', methods=["GET"])
@login_required
def get_portfolio_transactions(portfolio_id, token):
    return get_transactions(portfolio_id)

@app.route('/api/secured/user/portfolio/<portfolio_id>/tokens', methods=["GET"])
@login_required
def get_portfolio_tokens(portfolio_id, token):
    return get_tokens(portfolio_id)

@app.route('/api/secured/user/portfolio/<portfolio_id>/token', methods=["GET"])
@login_required
def get_portfolio_token(portfolio_id, token):
    return get_token(json.loads(request.data), int(portfolio_id))

@app.route('/api/secured/user/portfolio/<portfolio_id>/coins', methods=["GET"])
@login_required
def get_portfolio_coins(portfolio_id, token):
    return get_coins(portfolio_id)

@app.route('/api/secured/user/portfolio/<portfolio_id>/transaction', methods=["POST"])
@login_required
def add_transaction_to_portfolio(portfolio_id, token):
    return new_transaction(json.loads(request.data), int(portfolio_id))


@app.route(environ.get("ROUTE_UPDATE_COINS"), methods=["POST"])
def update_coins_db():
    return update_coins()


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
