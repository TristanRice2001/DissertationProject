from app import app
from app.messages import auth_messages
from app.jwt_helpers import jwt_token_required
from app.responses import generic_response
from app.validator import validator

@app.route("/me")
@jwt_token_required
def me(jwt_user):
    return generic_response(message=auth_messages["jwt_valid"], is_successfull=True)


@app.route("/test/<a>/<b>")
@validator(validators="aaa")
def test(*args, **kwargs):
    print(args)
    print(kwargs)
    return "aaa"