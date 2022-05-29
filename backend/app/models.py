from app import db
from sqlalchemy import inspect
import random
import datetime



class Coins(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    slug = db.Column(db.String(256))
    symbol = db.Column(db.String(256))
    rank = db.Column(db.Integer)
    logo = db.Column(db.String(256))

    def __init__(self, id, name, slug, symbol, rank, logo):
        self.id = id
        self.name = name
        self.slug = slug
        self.symbol = symbol
        self.rank = rank
        self.logo = logo

    def as_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

class Portfolio(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(256))
    user_id = db.Column(db.String(256))
    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id

    def as_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    coin_id = db.Column(db.Integer)
    count = db.Column(db.Float)
    price = db.Column(db.Float)
    date = db.Column(db.DateTime())
    transaction_type = db.Column(db.String)
    portfolio_id  = db.Column(db.Integer)

    def __init__(self, coin_id, count, price, date, transaction_type, portfolio_id):
        self.coin_id = coin_id
        self.count = count
        self.price = price
        self.date = date
        self.transaction_type = transaction_type
        self.portfolio_id = portfolio_id

    def as_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

class Tokens(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    coin_id = db.Column(db.Integer)
    count = db.Column(db.Float)
    price = db.Column(db.Float)
    portfolio_id  = db.Column(db.Integer)
    logo = db.Column(db.String(256))


    def __init__(self, coin_id, count, price, portfolio_id, logo):
        self.coin_id = coin_id
        self.count = count
        self.price = price
        self.portfolio_id = portfolio_id
        self.logo = logo

    def as_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

class Auth(db.Model):
    address = db.Column(db.String(42), primary_key=True)
    random = db.Column(db.Integer)
    time_created = db.Column(db.DateTime())

    def __init__(self, address):
        self.address = address
        self.random = random.randint(100000000, 999999999)
        self.time_created = datetime.datetime.now().isoformat()

    def as_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}