from flask import Flask
from commands import run_image, terminate_container


app = Flask(__name__)

@app.route("/challenge/start/<id>")
def start_challenge(id):
    return run_image(id)
    
@app.route("/challenge/stop/<container_id>")
def terminate_challenge(container_id):
    return terminate_container(container_id)

if __name__ == "__main__":
    app.run()