class UserNotFound(Exception):
    def __init__(self, id):
        super().__init__(f"User with id {id} not found!")

class EmailNotFound(Exception):
    def __init__(self, email):
        super().__init__(f"Email {email} not found!")
    
class EmailAlreadyExist(Exception):
    def __init__(self, email):
        super().__init__(f"Email {email} already exists!") 

class PasswordMismatch(Exception):
    def __init__(self):
        super().__init__(f"Incorrect password, please try again!")
        
class JWTTokenError(Exception):
    def __init__(self):
        super().__init__("Failed to validate JWT token")
        