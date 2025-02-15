class UserNotFoundError(Exception):
    def __init__(self, id):
        super().__init__(f"User with id {id} not found!")

class EmailNotFoundError(Exception):
    def __init__(self, email):
        super().__init__(f"Email {email} not found!")
        
class PasswordMismatchError(Exception):
    def __init__(self):
        super().__init__(f"Incorrect password, please try again!")
        
class JWTTokenError(Exception):
    def __init__(self):
        super().__init__("Failed to validate JWT token")