import socket

class ChallengeService:
    def __init__(self, ip, port):
        self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.client.connect((ip, port))
    
    def _parse_command(self, command):
        return command[1:-1].split(",")

    def _send_command(self, command, arguments):
        string_arguments = ",".join(arguments)
        formatted_command = f"({command},{string_arguments})"
        self.client.send((formatted_command+"\n").encode())

    def _receive_command(self):
        data = self.client.recv(1024)
        data = data.decode()

        if data.endswith("\n"):
            data = data[:-1]

        return data
    
    def start_challenge(self, challenge_id):
        self._send_command("START", arguments=[str(challenge_id)])
        command_result = self._receive_command()
        if command_result[0] == "FAILURE":
            return {
                "success": False
            }
        
        return {
            "ip": command_result[1],
            "id": command_result[2]
        }

    def terminate_challenge(self, challenge_id):
        return {
            "success": True
        }
    