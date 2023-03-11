from app.exceptions import ValidationError
from app.messages import auth_messages
from app.models import User
from app.constants import USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH, REGEX_VERIFY_USERNAME, REGEX_VERIFY_PASSWORD
import re

def validate_username(username):
    if not username or not issubclass(type(username), str):
        raise ValidationError(auth_messages["username_missing"])

    if len(username) < USERNAME_MIN_LENGTH or len(username) > USERNAME_MAX_LENGTH:
        raise ValidationError(auth_messages["username_length_incorrect"])
    
    is_username_valid = re.match(REGEX_VERIFY_USERNAME, username)
    if not is_username_valid:
        raise ValidationError(auth_messages["username_validity_incorrect"])
    
def validate_password(password):
    if not password or not issubclass(type(password), str):
        raise ValidationError(auth_messages["password_missing"])
    
    if len(password) < PASSWORD_MIN_LENGTH:
        raise ValidationError(auth_messages["password_length_incorrect"])
    
    is_password_valid = re.match(REGEX_VERIFY_PASSWORD, password)
    if not is_password_valid:
        raise ValidationError(auth_messages["password_validity_incorrect"])

def validate_username_not_taken(username):
    user_check = User.query.filter_by(username=username).first()

    if user_check is not None:
        raise ValidationError(auth_messages["user_exists"])

def validate_userid(user_id):
    try:
        int(user_id)
    except  (ValueError, TypeError):
        raise ValidationError(auth_messages["invalid_user_id"])
    
def validate_userid_exists(user_id):
    user_check = User.query.filter_by(id=user_id).first()

    if user_check is None:
        raise ValidationError(auth_messages["user_does_not_exist"])