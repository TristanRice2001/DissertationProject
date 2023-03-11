from app import db, challenge_service
from app.models import UserChallenge
from app.exceptions import ChallengeServerError


class ChallengeFacade:
    @staticmethod
    def start_challenge(challenge, user):
        challenge_info = challenge_service.start_challenge(challenge.id)

        user_challenge = UserChallenge(
            ip=challenge_info["ip"], 
            challenge=challenge,
            container_id=challenge_info["container_id"],
            user=user,
        )

        db.session.add(user_challenge)
        db.session.commit()
        
        return user_challenge
        
    @staticmethod
    def terminate_challenge(challenge):
        termination_result = challenge_service.stop_challenge(challenge.container_id)

        if not termination_result["success"]:
          raise ChallengeServerError("There was an error terminating this challenge")

        db.session.delete(challenge)
        db.session.commit()