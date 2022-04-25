from app import db
from app.models import Portfolio
from flask import jsonify

def get_portfolios(user_address):
    result = Portfolio.query.filter(Portfolio.user_id==user_address)

    res = []
    for portfolio in result.all():
        res.append(portfolio.as_dict())

    return jsonify(res)

def get_portfolio_transaction():
    pass
    result = Portfolio.query.filter()

def new_portfolio(data, user_id):
    new_portfolio = Portfolio(data['name'], user_id)
    db.session.add(new_portfolio)
    db.session.commit()
    return new_portfolio.as_dict()

#def token_add(data):
#    new_token = Transaction(data['name'], data['user_id'])
#    db.session.add(new_token)
#    db.session.commit()
