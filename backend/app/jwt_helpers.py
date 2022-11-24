import jwt
from functools import wraps
from app.messages import general_messages
from flask import request
from app.models import User
from app.responses import generic_response
from app.constants import JWT_ALGORITHM
from app import app

def generate_jwt_for_user(user):
    payload = {"username": user.username}
    return jwt.encode(payload, app.config["SECRET_KEY"], JWT_ALGORITHM)

def jwt_token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        if "Authorization" not in request.headers or not request.headers["Authorization"]:
            return generic_response(message=general_messages["JWT_token_missing"], is_successfull=False)

        token = request.headers["Authorization"]
        
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], JWT_ALGORITHM)
            jwt_user = User.query.filter_by(username=data["username"]).first()
        except:
            return generic_response(message=general_messages["JWT_token_invalid"], is_successfull=False)

        if not jwt_user:
            return generic_response(message=general_messages["JWT_user_not_exist"])

        return f(jwt_user, *args, **kwargs)
    
    return decorator