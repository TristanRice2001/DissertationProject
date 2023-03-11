from app import app
from app.messages import auth_messages
from app.jwt_helpers import jwt_token_required
from app.responses import generic_response
from app.validator import validator
from app.models import User
from app.validators.validate_user import validate_userid, validate_userid_exists

@app.route("/me")
@jwt_token_required
def me(jwt_user):
    return generic_response(message=auth_messages["jwt_valid"], is_successfull=True)

@app.route("/user/<user_id>/points")
@validator(
    validators=[validate_userid, validate_userid_exists],
    expected_args=["user_id"]
)
def user_points(user_id):
    u = User.query.filter_by(id=user_id).first()
    return u.points
