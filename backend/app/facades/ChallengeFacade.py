from app import db, challenge_service
from app.models import UserChallenge
from app.exceptions import ChallengeServerError


class ChallengeFacade:
    @staticmethod
    def start_challenge(challenge, user):
        challenge_info = challenge_service.start_challenge(challenge.id)

        if not challenge_info["success"]:
            raise ChallengeServerError("There was an error starting the challenge")

        user_challenge = UserChallenge(
            ip=challenge_info["ip"], 
            challenge=challenge,
            user=user,
        )

        db.session.add(user_challenge)
        db.session.commit()
        
        return user_challenge
        