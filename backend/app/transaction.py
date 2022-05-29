from datetime import date
from itertools import count
from flask_restful import abort
from app.models import Transaction, Tokens, Coins
from app import db
from sqlalchemy import exc   
import traceback
from flask import jsonify

def new_transaction(data, portfolio_id):
    try:
        transaction = Transaction(data["coin_id"], data["count"], data["price"], data["date"], data["transaction_type"], portfolio_id)
        if (data["transaction_type"] != "sale") and (data["transaction_type"] != "buy"):
            abort(400, "Введен неверный тип транзакции")
        
        result = Tokens.query.filter(Tokens.portfolio_id==portfolio_id, Tokens.coin_id==data["coin_id"]).first()
        coin = Coins.query.filter(Coins.id==data["coin_id"]).first()
        if result == None:
            token = Tokens(data["coin_id"], data["count"], data["price"], portfolio_id, coin.as_dict()["logo"])
            db.session.add(token)
        else:  
            x = db.session.query(Tokens).get(result.as_dict()["id"])
            if data["transaction_type"] == "sale":
                x.count = result.as_dict()["count"]-data["count"]
            else:
                x.count = result.as_dict()["count"]+data["count"]
                x.price = (result.as_dict()["count"]*result.as_dict()["price"]+data["count"]*data["price"])/(result.as_dict()["count"]+data["count"])
        db.session.add(transaction)
        db.session.commit()
        return transaction.as_dict()
    except exc.SQLAlchemyError as e:
        return e
    except Exception as e:
        return traceback.format_exc()

def get_transactions(data):
    result = Transaction.query.filter(Transaction.portfolio_id==data).order_by(Transaction.date)

    res = []
    for transaction in result.all():
        res.append(transaction.as_dict())



    return jsonify(res)

def get_tokens(data):
    result = Tokens.query.filter(Tokens.portfolio_id==data)
    res = []
    for transaction in result.all():
        res.append(transaction.as_dict())



    return jsonify(res)

def get_token(data, portfolio_id):
    result = Tokens.query.filter(Tokens.portfolio_id==portfolio_id, Tokens.coin_id==data["coins_id"])
    res = []
    for transaction in result.all():
        res.append(transaction.as_dict())



    return jsonify(res)