from flask import Flask
from app.config import Config
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.services import ChallengeService
from flask_cors import CORS


naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

 
app = Flask(__name__)
app.config.from_object(Config)
challenge_service = None
challenge_service = ChallengeService("127.0.0.1", 5000)
db = SQLAlchemy(app, metadata=MetaData(naming_convention=naming_convention))
migrate = Migrate(app, db, render_as_batch=True)
CORS(app)

from app import routes
