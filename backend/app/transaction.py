from app.models import Transaction
from app import db
from sqlalchemy import exc   
import traceback
from flask import jsonify

def new_transaction(dto, portfolio_id):
    try:
        transaction = Transaction(dto["coin_id"], dto["count"], dto["price"], dto["buy_date"], portfolio_id)
        db.session.add(transaction)
        db.session.commit()
        return transaction.as_dict()
    except exc.SQLAlchemyError as e:
        return e
    except Exception as e:
        return traceback.format_exc()

def get_transactions(data):
    result = Transaction.query.filter(Transaction.portfolio_id==data)

    res = []
    for transaction in result.all():
        res.append(transaction.as_dict())

    return jsonify(res)