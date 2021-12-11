from app import db
from uuid import uuid4
from sqlalchemy import inspect


class Users(db.Model):
    id = db.Column(db.String(256), primary_key=True)

    def __init__(self):
        self.id = str(uuid4())


class Coins(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    slug = db.Column(db.String(256))
    symbol = db.Column(db.String(256))
    rank = db.Column(db.Integer)

    def __init__(self, id, name, slug, symbol, rank):
        self.id = id
        self.name = name
        self.slug = slug
        self.symbol = symbol
        self.rank = rank

    def as_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
