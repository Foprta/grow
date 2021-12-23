from app.models import Coins, Users
from app import db

def new_user():
    user = Users()
    db.session.add(user)
    db.session.commit()
    return user.id