from app import app, db
from flask import jsonify, request
from app.models import User
from app.responses import generic_response
from app.exceptions import InvalidFieldException
from sqlalchemy import exc
from app.messages import auth_messages
from app.validators import validate_username, validate_password
from app.jwt_helpers import generate_jwt_for_user

@app.route("/register", methods=["post"])
def register():
    json_parsed_request = request.get_json()
    
    if "username" not in json_parsed_request or "password" not in json_parsed_request:
        return generic_response(
            message=auth_messages["username_or_pass_missing"], 
            is_successfull=False
        )

    username = json_parsed_request["username"]
    password = json_parsed_request["password"]

    try:
        validate_username(username)
        validate_password(password)
    except InvalidFieldException as e:
        return generic_response(message=str(e), is_successfull=False)

    user = User(username=username, password=password.encode())
    
    try:
        db.session.add(user)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        return generic_response(
            message=auth_messages["user_exists"],
            is_successfull=False
        )
    
    user_token = generate_jwt_for_user(user) 
        
    return generic_response(message=auth_messages["user_created"], is_successfull=True, token=user_token)