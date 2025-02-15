from datetime import datetime, timezone, timedelta
from google.auth import jwt as google_jwt

from api.session import RelationalSession
from api.session.models import User
from api.utils import generate_primary_key, encrypt_password, decrypt_password, get_jwt_token
from api.error import UserNotFoundError, EmailNotFoundError, PasswordMismatchError

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
        
        if not user:
            raise UserNotFoundError(id=id)
        
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
        self.session.add(user)
        self.session.commit()
        
        created_user = self.get_user(user.id)
        
        return created_user.to_dict()
    
    def login(self, email, password):
        user = self.session.get(User, email=email)
        if not user:
            raise EmailNotFoundError(email=email)
        
        if decrypt_password(user.hash_password, user.password_salt) != password:
            raise PasswordMismatchError()
        
        token = get_jwt_token(user.id, user.email, datetime.now()+timedelta(minutes=20))
        
        return user, token
    
class GoogleAuthenticator(Authenticator):
    def signup(self, credential):
        decoded_credential = google_jwt.decode(credential, verify=False)
        print(decoded_credential)
    
    def login(self, credential):
        pass