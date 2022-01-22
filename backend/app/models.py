from app import db
from sqlalchemy import inspect


class Users(db.Model):
    id = db.Column(db.String(42), primary_key=True)

    def __init__(self, address):
        self.id = address


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