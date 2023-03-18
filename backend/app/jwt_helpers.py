import jwt
from functools import wraps
from app.messages import general_messages
from flask import request
from app.models import User
from app.responses import generic_response, error_response
from app.constants import JWT_ALGORITHM
from app import app

def generate_jwt_for_user(user):
    payload = {"username": user.username}
    return jwt.encode(payload, app.config["SECRET_KEY"], JWT_ALGORITHM)

def get_user_from_jwt_token():
    if "Authorization" not in request.headers or not request.headers["Authorization"]:
        return None
    
    token = request.headers["Authorization"]
    print("Here")

    try:
        data = jwt.decode(token, app.config["SECRET_KEY"], JWT_ALGORITHM)
        jwt_user = User.query.filter_by(username=data["username"]).first()
    except:
        return None

    return jwt_user

def jwt_token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        user = get_user_from_jwt_token()

        if not user:
            return error_response(message="Authorization error")
        
        # if "Authorization" not in request.headers or not request.headers["Authorization"]:
        #     return generic_response(message=general_messages["JWT_token_missing"], is_successfull=False)

        # token = request.headers["Authorization"]
        
        # try:
        #     data = jwt.decode(token, app.config["SECRET_KEY"], JWT_ALGORITHM)
        #     jwt_user = User.query.filter_by(username=data["username"]).first()
        # except:
        #     return generic_response(message=general_messages["JWT_token_invalid"], is_successfull=False)

        # if not jwt_user:
        #     return generic_response(message=general_messages["JWT_user_not_exist"])

        return f(user, *args, **kwargs)
    
    return decorator

def jwt_token_desired(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        user = get_user_from_jwt_token()
        print(user)
        return f(user, *args, **kwargs)

    return decorator