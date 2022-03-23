from sqlalchemy.sql.functions import user
from app import db
from sqlalchemy import func
from app.models import Portfolio, Transaction

def get_portfolio(user_id):
    result = Portfolio.query.filter(
            func.startswith(user_id)
    )
    res = {'portfolios': []}
    for portfolio in result.all():
        res['portfolios'].append(portfolio.as_dict())

    return res

def new_portfolio(data):
    new_portfolio = Portfolio(data['name'], data['user_id'])
    db.session.add(new_portfolio)
    db.session.commit()

def token_add(data):
    new_token = Transaction(data['name'], data['user_id'])
    db.session.add(new_token)
    db.session.commit()