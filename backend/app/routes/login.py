from app import app, db
from flask import jsonify, request
from app.models import User
from app.responses import generic_response
from app.exceptions import InvalidFieldException
from app.messages import auth_messages
from app.jwt_helpers import generate_jwt_for_user

@app.route("/login", methods=["POST"])
def login():
    json_parsed_request = request.get_json()
    
    if "username" not in json_parsed_request or "password" not in json_parsed_request:
        return generic_response(
            message=auth_messages["username_or_pass_missing"], 
            is_successfull=False
        )

    username = json_parsed_request["username"]
    password = json_parsed_request["password"]

    user = User.query.filter_by(username=username).first()

    if not user or not user.verify_password(password.encode()):
        return generic_response(message=auth_message["invalid_login"], is_successfull=True)
    
    return generic_response(
        message=auth_messages["user_created"], 
        is_successfull=True, 
        token=generate_jwt_for_user(user)
    )