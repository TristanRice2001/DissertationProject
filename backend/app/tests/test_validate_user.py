import unittest
from validators.validate_user import validate_username, validate_password
from exceptions import InvalidFieldException

class TestValidateUser(unittest.TestCase):
    def test_validate_username(self):
        # Test that it throws an error if username is None
        with self.assertRaises(InvalidFieldException):
            validate_username(None)
        
        # Test that it throws an error if username is not a string
        with self.assertRaises(InvalidFieldException):
            validate_username(5)

        #Test that it throws an error when username is too short
        with self.assertRaises(InvalidFieldException):
            validate_username("aa")

        #Test that it throws an error when username is too long
        with self.assertRaises(InvalidFieldException):
            username_too_long = "a"*20
            validate_username(username_too_long)
        
        #Test that it throws an error when there are special characters in username
        with self.assertRaises(InvalidFieldException):
            username_special_characters = "username$$1"
            validate_username(username_special_characters)
        
        #Test that it returns true for valid username
        self.assertTrue(validate_username("valid_user"))
    
    def test_validate_username(self):
        # Test that it throws an error if password is None
        with self.assertRaises(InvalidFieldException):
            validate_password(None)
        
        # Test that it throws an error if password is not a string
        with self.assertRaises(InvalidFieldException):
            validate_password(5)

        #Test that it throws an error when password is too short
        with self.assertRaises(InvalidFieldException):
            validate_password("aaaaaaa")
        
        #Test that it throws an error when there are no special characters in password
        with self.assertRaises(InvalidFieldException):
            password_no_special_chars = "Passwordnospecialchars123"
            validate_password(password_no_special_chars)

        #Test that it throws an error when there are no numbers in password
        with self.assertRaises(InvalidFieldException):
            password_no_numbers = "Passwordnonumbers$"
            validate_password(password_no_numbers)

        #Test that it throws an error when there are no capital letters in password
        with self.assertRaises(InvalidFieldException):
            password_no_capitals = "passwordnocapitalletter123$"
            validate_password(password_no_capitals)

        #Test that it returns true for valid username
        self.assertTrue(validate_password("V4l1d_pa$$w0rd"))
    

if __name__ == "__main__":
    unittest.main()