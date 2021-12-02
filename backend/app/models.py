from app import db

class Users(db.Model):
    id = db.Column(db.String(80), primary_key=True)

    def __init__(self):
        self.id = "12312344"

    def __repr__(self):
        return '<User {}>'.format(self.id)
