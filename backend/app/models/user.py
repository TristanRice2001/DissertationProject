from app import db
import bcrypt

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(18), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, username, password):
        self.username = username
        self.password = bcrypt.hashpw(password, bcrypt.gensalt(14))

    def __repr__(self):
        return f"<User: {self.username}:{self.password}>"

    def verify_password(self, check_password):
        return bcrypt.checkpw(check_password, self.password)