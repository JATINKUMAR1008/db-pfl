from server import app
from models import User
@app.route('/')
def hello_world():
    return 'Hello, World!'
@app.route('/users/',methods=['POST'],response_model=User)
def create_user(user: User):
    created_user = User(**user.model_dump())
    return user