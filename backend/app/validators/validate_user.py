from app.exceptions import InvalidFieldException
from app.messages import auth_messages
from app.constants import USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH, REGEX_VERIFY_USERNAME, REGEX_VERIFY_PASSWORD
import re

def validate_username(username):
    if not username or not issubclass(type(username), str):
        raise InvalidFieldException(auth_messages["username_missing"])

    if len(username) < USERNAME_MIN_LENGTH or len(username) > USERNAME_MAX_LENGTH:
        raise InvalidFieldException(auth_messages["username_length_incorrect"])
    
    is_username_valid = re.match(REGEX_VERIFY_USERNAME, username)
    if not is_username_valid:
        raise InvalidFieldException(auth_messages["username_validity_incorrect"])
    
    return True

def validate_password(password):
    if not password or not issubclass(type(password), str):
        raise InvalidFieldException(auth_messages["password_missing"])
    
    if len(password) < PASSWORD_MIN_LENGTH:
        raise InvalidFieldException(auth_messages["password_length_incorrect"])
    
    is_password_valid = re.match(REGEX_VERIFY_PASSWORD, password)
    if not is_password_valid:
        raise InvalidFieldException(auth_messages["password_validity_incorrect"])