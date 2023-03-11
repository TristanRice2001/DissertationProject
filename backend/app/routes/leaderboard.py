from flask import jsonify
from app import app, db
from sqlalchemy.sql import func
from sqlalchemy import desc
from app.models import User, Challenge, ChallengeCompletion

@app.route("/leaderboard")
def leaderboard():
    chal_completions = (
        db.session.query(func.sum(Challenge.points))
            .join(ChallengeCompletion, Challenge.id == ChallengeCompletion.challenge_id)
            .filter(ChallengeCompletion.user_id == User.id)
    ).subquery()
    user_leaderboard = User.query.order_by(desc(chal_completions)).all()

    user_points = [
        {
            "username": u.username,
            "points": u.points
        }
        for u in user_leaderboard
    ]

    return jsonify(user_points)
