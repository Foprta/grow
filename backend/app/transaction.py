from app.models import Transaction
from app import db
from sqlalchemy import exc   
import traceback

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


