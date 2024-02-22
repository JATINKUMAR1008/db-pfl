from flask import Flask
from dotenv import load_dotenv
import os
load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
print(os.getenv('DATABASE_URI'))
from server import routes