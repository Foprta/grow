from app.models import Transaction
from app import db

def new_transaction(dto, portfolio_id):
    transaction = Transaction(dto["coin_id"], dto["count"], dto["price"], dto["buy_date"], portfolio_id)
    db.session.add(transaction)
    db.session.commit()