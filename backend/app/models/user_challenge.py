import time
from sqlalchemy.orm import aliased
from app import db
from app.models import Challenge

class UserChallenge(db.Model):
    __tablename__ = "user_challenges"
    id = db.Column(db.Integer, primary_key=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey("challenges.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    ip = db.Column(db.String(255))
    challenge = db.relationship("Challenge")
    time_started = db.Column(db.Integer, default=time.time())
    user = db.relationship("User", lazy="subquery")

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.time_started = int(time.time())

    def pretty(self):
        return {
            **self.challenge.pretty(),
            "status": "active",
            "ip": self.ip
        }

    @staticmethod
    def get_active_challenges(user):
        current_time = time.time()
        user_active_challenges = (
            UserChallenge
                .query
                .filter_by(user=user)
                .join(Challenge, aliased=True)
                .filter((current_time - UserChallenge.time_started) < Challenge.time_allowed)
                .all()
        )
        return user_active_challenges
