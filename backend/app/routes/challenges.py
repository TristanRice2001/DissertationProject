import time
from flask import jsonify
from app.facades import ChallengeFacade
from app import app, db
from app import challenge_service
from app.models import Challenge, UserChallenge
from app.messages import challenge_messages
from app.responses import error_response, success_response
from app.jwt_helpers import jwt_token_required
from app.exceptions import ChallengeServerError
from app.validator import validator
from app.validators import validate_challenge_id, validate_challenge_exists

#ToDo: Refactor this
def get_all_challenges_with_user(user):
  current_time = int(time.time())
  user_active_challenges = UserChallenge.query.filter_by(user=user).all()
  # user_active_Challenges = 
  #   UserChallenge
  #     .query.filter_by(user=user)
  #     .join(UserChallenge.challenge, aliased=True)
  #     .filter_by(time_taken )
  # user_active_challenges = UserChallenge.query.filter_by(
  #   user=user
  # ).all()
  user_active_challenge_ids = [user_challenge.challenge.id for user_challenge in user_active_challenges]
  all_challenges = Challenge.query.all()
  response = []
  curr_active_challenge = 0
  for challenge in all_challenges:
    if challenge.id not in user_active_challenge_ids:
      response.append(challenge.inactive())
      continue
    active_challenge_dict = challenge.active(
      ip=user_active_challenges[curr_active_challenge].ip,
      time_left=7200,
      time_total=7200
    )
    response.append(active_challenge_dict)
    curr_active_challenge+=1
  return response

@app.route("/challenges")
@jwt_token_required
def challenges(jwt_user):
  print(UserChallenge.get_active_challenges(jwt_user))
  # user_chals = get_all_challenges_with_user(jwt_user)
  return jsonify({})


@app.route("/challenge/<challenge_id>/start")
@jwt_token_required
@validator(
  validators=[validate_challenge_id, validate_challenge_exists],
  expected_args=["challenge_id"]
)
def start_challenge(jwt_user, challenge_id):
  print("Here")
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
  
  # termination_result = challenge_service.terminate_challenge(challenge_id)

  # if not termination_result["success"]:
  #   return error_response(message=challenge_messages["termination_unsuccessful"])
  
  challenge_json = user_challenge.challenge
  db.session.delete(user_challenge)  
  db.session.commit()
  print(challenge_json.inactive())

  return success_response(
    message=challenge_messages["terminated_successfully"],
    challenge=challenge_json.inactive()
  )