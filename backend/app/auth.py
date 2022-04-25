from functools import wraps
from app.models import Auth
from app import db
from eth_account import Account
from eth_account.messages import encode_defunct
from datetime import datetime, timedelta
import jwt
from os import environ
from flask import request, abort


JWT_SECRET = environ.get('JWT_SECRET')


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            _, encodedJwt = request.headers["Authorization"].split(" ")
        except:
            return abort(401, "No access token")

        try:
            token = jwt.decode(encodedJwt, JWT_SECRET, algorithms=["HS256"])
        except:
            abort(401, "token invalid")

        try:    
            return f(token=token, *args, **kwargs)
        except Exception as e:
            return abort(e)
    return decorated_function
#JSONDecodeError

def new_auth(dto):
    auth = Auth(dto["address"])
    db.session.merge(auth)
    db.session.commit()
    return auth


# { address: '0x234234', signature: '0x3asdasdad'}
def create_jwt(data):
    auth = db.session.query(Auth).get(data['address'])
    random = auth.random
    time = auth.time_created
    expired_time = time + timedelta(minutes=5)
    present = datetime.now()
    if present > expired_time:
        return 'Token expired'

    # Аддресс
    address = Account.recover_message(encode_defunct(
        text=str(random)), signature=data["signature"])

    if address != auth.address:
        return "ты RAT"

    encoded = jwt.encode({"address": auth.address},
                         JWT_SECRET, algorithm="HS256")

    return encoded