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
    leaderboard_positions_sql = User.query.order_by(desc(chal_completions))
    leaderboard_positions_sql_result = leaderboard_positions_sql.all()
    leaderboard_positions_top_10 = leaderboard_positions_sql_result[:10]

    make_leaderboard_json = lambda users: [
        {"username": user.username, "points": user.points} for user in users
    ]

    leaderboard = make_leaderboard_json(leaderboard_positions_top_10)
    print(leaderboard_positions_sql_result)
    print(jwt_user)
    try:
        user_position = leaderboard_positions_sql_result.index(jwt_user)
        
    except ValueError:
        user_position = 0
    print(user_position)
    current_user_position_context = leaderboard_positions_sql_result[
        max(0, user_position-1):
        min(len(leaderboard_positions_sql_result), user_position+2)
    ]
    leaderboard_user_position_context = make_leaderboard_json(current_user_position_context) 
    
    current_user_position = {
        "position": user_position,
        "context": leaderboard_user_position_context
    }

    response = {
        "leaderboardTop10": leaderboard,
    }

    if jwt_user:
        response["currentUserPosition"] = current_user_position

    return jsonify(response)
