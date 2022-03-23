from app.models import Users
from app import db

def new_user(dto):
    user = Users(dto["address"])
    db.session.add(user)
    db.session.commit()
