from flask import Flask
from db import new_user
app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello"

@app.route('/api/user', mehods=['POST'])
def db_new_user():
    return new_user()

    

if __name__ == "__main__":
	app.run(debug=True)