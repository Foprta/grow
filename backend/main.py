from flask import Flask
import uuid
from db import Check_User
app = Flask(__name__)

@app.route('/')
def hello_world():
    return str(uuid.uuid4())

@app.route('/api/user')
def New_User():
    New_Id = str(uuid.uuid4())
    return Check_User(New_Id)

    

if __name__ == "__main__":
	app.run(debug=True)