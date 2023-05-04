import jwt
from functools import wraps
from flask import request
from app.models import User
from app.responses import error_response
from app.constants import JWT_ALGORITHM
from app import app

def generate_jwt_for_user(user):
    payload = {"username": user.username}
    return jwt.encode(payload, app.config["SECRET_KEY"], JWT_ALGORITHM)

def get_user_from_jwt_token():
    if "Authorization" not in request.headers or not request.headers["Authorization"]:
        return None
    
    token = request.headers["Authorization"]

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
        
        return f(user, *args, **kwargs)
    
    return decorator

def jwt_token_desired(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        user = get_user_from_jwt_token()
        return f(user, *args, **kwargs)

    return decorator