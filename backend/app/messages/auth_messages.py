from app.constants import PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH

auth_messages = {
    "username_or_pass_missing": "Please include a username or passsword",
    "username_missing": "Please enter a username",
    "password_missing": "Please enter a password",
    "password_length_incorrect": f"Password must be at least {PASSWORD_MIN_LENGTH} characters long",
    "password_validity_incorrect": "Password must contain one special character, one number, and one capital letter",
    "username_length_incorrect": f"Username must be between {USERNAME_MIN_LENGTH} and {USERNAME_MAX_LENGTH} characters long",
    "username_validity_incorrect": "Username can only contain words, numbers, or underscores",
    "user_created": "User has been created successfully",
    "user_exists": "A user with that username already exists",
    "invalid_login": "Username or password is incorrect",
    "jwt_valid": "JWT token is valid for user"
}