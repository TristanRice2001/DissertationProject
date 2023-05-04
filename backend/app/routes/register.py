from app import app, db
from app.models import User
from app.responses import generic_response
from app.messages import auth_messages
from app.validators import validate_username, validate_password, validate_username_not_taken
from app.jwt_helpers import generate_jwt_for_user
from app.validator import validator

@app.route("/register", methods=["post"])
@validator(
    validators=[
        validate_username,
        validate_password,
        validate_username_not_taken
    ],
    expected_args=["username", "password"]
)
def register(username, password):
    user = User(username=username, password=password.encode())
    db.session.add(user)
    db.session.commit()    
    user_token = generate_jwt_for_user(user) 
        
    return generic_response(message=auth_messages["user_created"], is_successfull=True, token=user_token)