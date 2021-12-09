from app import db
from uuid import uuid4

class Users(db.Model):
    id = db.Column(db.String(256), primary_key=True)

    def __init__(self):
        self.id = str(uuid4())  

    def __repr__(self):
        return '<User {}>'.format(self.id)


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

    def __repr__(self):
        return '<Coin {}>'.format(self.id)