from app import db

class UserChallenge(db.Model):
    __tablename__ = "user_challenges"
    id = db.Column(db.Integer, primary_key=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey("challenges.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    ip = db.Column(db.String(255))
    challenge = db.relationship("Challenge")
    user = db.relationship("User")