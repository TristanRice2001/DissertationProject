from app import db

class Challenge(db.Model):
    __tablename__ = "challenges"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    points = db.Column(db.Integer)
    time_allowed = db.Column(db.Integer)
    flag_content = db.Column(db.String(255))
    hints = db.relationship("ChallengeHint", backref="challenge", lazy="dynamic")

    def __repr__(self):
        return f"<Challenge: {self.name}>"

    def pretty(self):
        hints_arr = [str(hint) for hint in self.hints.all()]
        return {
            "id": self.id,
            "name": self.name,
            "points": self.points,
            "hints": hints_arr,
            "secondsAvailable": self.time_allowed
        }

    def active(self, ip, time_left, time_total):
        return {
            **self.pretty(),
            "ip": ip,
            "time_left": time_left,
            "time_total": time_total,
            "status": "active"
        }
    
    def inactive(self):
        return {
            **self.pretty(),
            "status": "inactive"
        }