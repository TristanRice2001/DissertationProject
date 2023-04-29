from flask import jsonify
from app import app, db
from sqlalchemy.sql import func
from sqlalchemy import desc
from app.models import User, Challenge, ChallengeCompletion
from app.jwt_helpers import jwt_token_desired

@app.route("/leaderboard")
@jwt_token_desired
def leaderboard(jwt_user):
    chal_completions = (
        db.session.query(func.sum(Challenge.points))
            .join(ChallengeCompletion, Challenge.id == ChallengeCompletion.challenge_id)
            .filter(ChallengeCompletion.user_id == User.id)
    ).scalar_subquery()
    
    leaderboard_positions_sql_result = db.session.query(User, chal_completions).order_by(desc(chal_completions)).all()
    leaderboard_positions_top_10 = leaderboard_positions_sql_result[:10]

    make_leaderboard_json = lambda users: [
            {"username": user.username, "points": points or 0} for user, points in users
    ]

    leaderboard = make_leaderboard_json(leaderboard_positions_top_10)
    
    if not jwt_user:
        return jsonify({"leaderboardTop10": leaderboard})

    user_position = [index for index, (user, points) in enumerate(leaderboard_positions_sql_result) if user == jwt_user][0]
    
    current_user_position_context = leaderboard_positions_sql_result[
        max(0, user_position-1):
        min(len(leaderboard_positions_sql_result), user_position+2)
    ]
    leaderboard_user_position_context = make_leaderboard_json(current_user_position_context) 
    
    current_user_position = {
        "position": user_position,
        "context": leaderboard_user_position_context
    }

    return jsonify({
        "leaderboardTop10": leaderboard,
        "currentUserPosition": current_user_position
    })
