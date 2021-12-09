from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:12345@localhost/grow'
db = SQLAlchemy(app)
cors = CORS(app)

from app import routes, models

db.create_all()