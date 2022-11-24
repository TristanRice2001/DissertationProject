from app import app
from app.models import User
from app.responses import error_response, success_response
from app.messages import auth_messages
from app.jwt_helpers import generate_jwt_for_user
from app.validator import validator
from app.validators import validate_username, validate_password

@app.route("/login", methods=["POST"])
@validator(
    validators=[validate_username, validate_password],
    expected_args=["username", "password"]
)
def login(username, password):
    user = User.query.filter_by(username=username).first()

    if not user or not user.verify_password(password.encode()):
        return error_response(message=auth_messages["invalid_login"])
    
    return success_response(
        message=auth_messages["login_successful"], 
        token=generate_jwt_for_user(user)
    )