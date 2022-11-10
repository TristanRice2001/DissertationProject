from app import db

class ChallengeHint(db.Model):
    __tablename__ = "challenge_hints"
    id = db.Column(db.Integer, primary_key=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey("challenges.id"))
    hint = db.Column(db.Text)

    def __str__(self):
        return self.hint