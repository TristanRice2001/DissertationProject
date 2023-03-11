import time
from app import db
from app.models import Challenge

class UserChallenge(db.Model):
    __tablename__ = "user_challenges"
    id = db.Column(db.Integer, primary_key=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey("challenges.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    ip = db.Column(db.String(255))
    container_id = db.Column(db.String(255))
    time_started = db.Column(db.Integer, default=time.time())
    challenge = db.relationship("Challenge")
    user = db.relationship("User", lazy="subquery")

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.time_started = int(time.time())

    def pretty(self):
        return {
            **self.challenge.pretty(),
            "status": "active",
            "ip": self.ip,
            "secondsLeft": self._total_seconds_left
        }

    @property
    def _total_seconds_left(self):
        current_time = time.time()
        time_remaining = self.challenge.time_allowed - (current_time - self.time_started)
        return int(time_remaining)