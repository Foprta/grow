from app import app, db
from app.models import Users
from app.coinmarketcap import get_coins

@app.route('/')
def index():
    return "HELLO MAN"

@app.route('/api/user', methods=["POST"])
def user_create():
    user = Users()
    db.session.add(user)
    db.session.commit()
    return user.id

@app.route('/api/coin')
def coin_create():
    get_coins()
    return "sd"