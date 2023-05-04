import requests
import json
from app.exceptions import ChallengeServerError

class ChallengeService:
    def __init__(self, ip, port):
        self.ip = ip
        self.port = port
        self.url = f"http://{self.ip}:{self.port}"
    
    
    def start_challenge(self, challenge_id):
        r = requests.get(f"http://{self.ip}:{self.port}/challenge/start/{challenge_id}")
        response_json = json.loads(r.text)

        if r.status_code != 200:
            raise ChallengeServerError("There was an error")
        
        if "success" not in response_json or not response_json["success"]:
            raise ChallengeServerError(response_json["message"] if "message" in response_json else "There was an error")
        
        if "ip" not in response_json or "container_id" not in response_json:
            raise ChallengeServerError("There was an error")
        
        return response_json
    
    def stop_challenge(self, container_id):
        r = requests.get(f"{self.url}/challenge/stop/{container_id}")
        response_json = json.loads(r.text)

        if r.status_code != 200:
            raise ChallengeServerError("There was an error")
        
        return response_json
