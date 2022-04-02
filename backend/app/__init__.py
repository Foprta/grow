from os import environ, path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv

dotenv_path = path.join(path.dirname(__file__), '../.env')

if path.exists(dotenv_path):
    load_dotenv(dotenv_path)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://{environ.get("DATABASE_USER")}:{environ.get("DATABASE_PASSWORD")}@{environ.get("DATABASE_URL")}/{environ.get("DATABASE_NAME")}'
db = SQLAlchemy(app)
cors = CORS(app)

from app import routes, models

db.create_all()
