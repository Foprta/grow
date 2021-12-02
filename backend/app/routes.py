from app import app, db
from app.models import Users

@app.route('/')
def index():
    user = Users()
    db.session.add(user)
    db.session.commit()
    return user.id