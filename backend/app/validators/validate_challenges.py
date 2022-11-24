from app.models import Challenge
from app.exceptions import ValidationError
from app.messages import challenge_messages

def validate_challenge_id(challenge_id):
    try:
        challenge_id = int(challenge_id)
    except ValueError:
        raise ValidationError(challenge_messages["invalid_challenge_id"])

def validate_challenge_exists(challenge_id):
    challenge = Challenge.query.get(challenge_id)
    if not challenge:
        raise ValidationError(challenge_messages["challenge_not_exist"])
