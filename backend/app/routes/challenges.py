from app import app
from app import db
from flask import jsonify
from app.models import Challenge, UserChallenge
from app.messages import challenge_messages
from app.responses import generic_response
from app.jwt_helpers import jwt_token_required

#ToDo: Refactor this
def get_all_challenges_with_user(user):
  user_active_challenges = UserChallenge.query.filter_by(user=user).all()
  user_active_challenge_ids = [challenge.id for challenge in user_active_challenges]
  all_challenges = Challenge.query.all()
  response = []
  curr_active_challenge = 0
  for challenge in all_challenges:
    obj = {**challenge.pretty(), "status": "inactive"}
    if challenge.id not in user_active_challenge_ids:
      response.append(obj)
      continue
    obj["status"] = "active"
    obj["ip"] = user_active_challenges[curr_active_challenge].ip
    curr_active_challenge+=1
    response.append(obj)
  return response

@app.route("/challenges")
@jwt_token_required
def challenges(jwt_user):
  user_chals = get_all_challenges_with_user(jwt_user)
  return jsonify(user_chals)


@app.route("/challenge/<challenge_id>/start")
@jwt_token_required
def start_challenge(jwt_user, challenge_id):
  try:
    challenge_id = int(challenge_id)
  except ValueError:
    return generic_response(message=challenge_messages["invalid_challenge_id"], is_successfull=False)
  
  challenge = Challenge.query.get(challenge_id)
  if not challenge:
    return generic_response(message=challenge_messages["challenge_not_exist"], is_successfull=False)
  
  existing_active_challenges = UserChallenge.query.filter_by(challenge_id=challenge_id).first()
  if existing_active_challenges is not None:
    return generic_response(
      message=challenge_messages["already_started"],
      is_successfull=False
    )

  user_challenge = UserChallenge(ip="10.10.10.10", challenge=challenge, user=jwt_user)

  db.session.add(user_challenge)
  db.session.commit()

  return generic_response(
    message=challenge_messages["created_successfully"],
    is_successfull=True
  )

@app.route("/challenge/<challenge_id>/terminate")
@jwt_token_required
def terminate_challenge(jwt_user, challenge_id):
  challenge = UserChallenge.query.filter_by(challenge_id=challenge_id).first()
  if not challenge:
    return generic_response(
      message=challenge_messages["not_started"],
      is_successfull=False
    )
  
  db.session.delete(challenge)  
  db.session.commit()

  return generic_response(
    message=challenge_messages["terminated_successfully"],
    is_successfull=True
  )