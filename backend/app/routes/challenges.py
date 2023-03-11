import time
from flask import jsonify
from app.facades import ChallengeFacade
from app import app, db
from app.models import Challenge, UserChallenge, ChallengeCompletion
from app.messages import challenge_messages
from app.responses import error_response, success_response
from app.jwt_helpers import jwt_token_required
from app.exceptions import ChallengeServerError
from app.validator import validator
from app.validators import validate_challenge_id, validate_challenge_exists

@app.route("/challenges")
@jwt_token_required
def challenges(jwt_user):
  return jsonify(jwt_user.active_challenges)

@app.route("/challenge/<challenge_id>/start")
@jwt_token_required
@validator(
  validators=[validate_challenge_id, validate_challenge_exists],
  expected_args=["challenge_id"]
)
def start_challenge(jwt_user, challenge_id):
  challenge = Challenge.query.get(challenge_id)
  existing_active_challenges = UserChallenge.query.filter_by(user_id=jwt_user.id, challenge_id=challenge_id).first()
  
  if existing_active_challenges is not None:
    return error_response(message=challenge_messages["already_started"])

  try:
    user_challenge = ChallengeFacade.start_challenge(challenge, jwt_user)
  except ChallengeServerError as e:
    return error_response(message=str(e))

  return success_response(
    message=challenge_messages["created_successfully"],
    challenge=user_challenge.pretty()
  )

@app.route("/challenge/<challenge_id>/terminate")
@jwt_token_required
@validator(
  validators=[validate_challenge_id, validate_challenge_exists],
  expected_args=["challenge_id"]
)
def terminate_challenge(jwt_user, challenge_id):
  user_challenge = UserChallenge.query.filter_by(challenge_id=challenge_id, user=jwt_user).first()

  if not user_challenge:
    return error_response(message=challenge_messages["not_started"])
  
  inactive_json = user_challenge.challenge.inactive()

  try:
    ChallengeFacade.terminate_challenge(user_challenge)
  except ChallengeServerError as e:
    return error_response(message=str(e))
  
  return success_response(
    message=challenge_messages["terminated_successfully"],
    challenge=inactive_json
  )

@app.route("/challenge/<challenge_id>/complete", methods=["POST"])
@jwt_token_required
@validator(
  validators=[validate_challenge_id, validate_challenge_exists],
  expected_args=["challenge_id", "flag"]
)
def complete_challenge(jwt_user, challenge_id, flag):
  user_completed = ChallengeCompletion.query.filter_by(user_id=jwt_user.id, challenge_id=challenge_id).first()

  if user_completed:
    return error_response(message=challenge_messages["challenge_already_completed"])

  chal = Challenge.query.filter_by(id=challenge_id, flag_content=flag).first()
  if not chal:
    return error_response(message=challenge_messages["invalid_flag"])
  
  new_user_completion = ChallengeCompletion(user_id=jwt_user.id, challenge_id=challenge_id)
  db.session.add(new_user_completion)
  db.session.commit()

  return success_response(message="Challenge completed")