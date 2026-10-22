from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "../db/projdatabase.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)

db = SQLAlchemy(app)