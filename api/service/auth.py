from datetime import datetime, timezone, timedelta
from google.auth import jwt as google_jwt

from session import RelationalSession
from session.models import User
from utils import generate_primary_key, encrypt_password, decrypt_password, get_jwt_token
from error import UserNotFound, EmailNotFound, PasswordMismatch, EmailAlreadyExist

class Authenticator:
    def __init__(self):
        self.session = RelationalSession()
        
    def signup(self, *args, **kwargs):
        raise NotImplementedError("Authenticator need to implement `signup` method")
    
    def login(self, *args, **kwargs):
        raise NotImplementedError("Authenticator need to implement `login` method")

class BlogrAuthenticator(Authenticator):
    
    def get_user(self, id):
        user = self.session.get(User, id=id)
        return user
    
    def signup(self, email, password):
        hashed_pass, salt = encrypt_password(password)
        
        user = User(**{
            "id": generate_primary_key("USR"), 
            "email": email, 
            "hash_password": hashed_pass, 
            "password_salt": salt, 
            "created_at": datetime.now(timezone.utc)
        })
        
        if self.session.get(User, email=email):
            raise EmailAlreadyExist(email)
        
        self.session.add(user)
        self.session.commit()
    
    def login(self, email, password):
        user = self.session.get(User, email=email)
        if not user:
            raise EmailNotFound(email=email)
        
        if decrypt_password(user.hash_password, user.password_salt) != password:
            raise PasswordMismatch()
        
        token = get_jwt_token(user.id, user.email, datetime.now()+timedelta(minutes=20))
        
        return user, token
    
class GoogleAuthenticator(Authenticator):
    def signup(self, credential):
        decoded_credential = google_jwt.decode(credential, verify=False)
        print(decoded_credential)
    
    def login(self, credential):
        pass