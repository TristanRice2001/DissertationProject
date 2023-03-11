from app import db

class ChallengeCompletion(db.Model):
    __tablename__ = "challenge_completions"
    id = db.Column(db.Integer, primary_key=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey("challenges.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    challenge = db.relationship("Challenge")
    user = db.relationship("User", lazy="subquery")
