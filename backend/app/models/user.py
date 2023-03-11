import time
from app import db
from app.models import ChallengeCompletion, Challenge, UserChallenge
from sqlalchemy.sql import func
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

    @property
    def points(self):
        chal_completions = (
            db.session.query(func.sum(Challenge.points))
                .join(ChallengeCompletion, Challenge.id == ChallengeCompletion.challenge_id)
                .filter(ChallengeCompletion.user_id == self.id)
                .first()
        )

        if not chal_completions or not chal_completions[0]:
            return 0
        
        return chal_completions[0]

    @property
    def active_challenges(self):
        current_time = time.time()
        all_completed_challenges = db.session.query(ChallengeCompletion.challenge_id).filter(
            ChallengeCompletion.user_id == self.id
        ).all()

        all_challenges = Challenge.query.all()
        jsonify_chals = list(map(lambda f: f.inactive(), all_challenges))

        user_active_challenges = (
            UserChallenge
                .query
                .filter_by(user=self)
                .join(Challenge, aliased=True)
                .filter((current_time - UserChallenge.time_started) < Challenge.time_allowed)
                .all()
        )

        for user_chal in user_active_challenges:
            challenge_index = all_challenges.index(user_chal.challenge)
            jsonify_chals[challenge_index] = user_chal.pretty()

        # Redo this better later
        for i, chal in enumerate(jsonify_chals):
            is_completed = tuple([chal["id"]]) in all_completed_challenges
            new_chal = {**chal, "completed": is_completed}
            jsonify_chals[i] = new_chal
        
        print(jsonify_chals)
        return jsonify_chals
