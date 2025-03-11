from datetime import datetime, timezone, timedelta
from google.auth.transport import requests
from google.oauth2 import id_token

import env_config
from session import RelationalSession
from session.models import User 
from constants import ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES
from utils import generate_primary_key, encrypt_password, decrypt_password, get_jwt_token, split_time
from error import EmailNotFound, PasswordMismatch, EmailAlreadyExist

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

    def login(self, email:str, password:str) -> tuple[dict, str]:
        '''Login service using blogr API
        
        `expiry_unit`: type str. e.g. days, seconds, microseconds, milliseconds, minutes, hours, weeks
        '''
        user = self.session.get(User, email=email)
        if not user:
            raise EmailNotFound(email=email)
        
        if decrypt_password(user.hash_password, user.password_salt) != password:
            raise PasswordMismatch()
        
        time, unit = split_time(ACCESS_TOKEN_EXPIRES)
        access_token = get_jwt_token(user.id, user.email, datetime.utcnow()+timedelta(**{unit: time}))
        
        time, unit = split_time(REFRESH_TOKEN_EXPIRES)
        refresh_token = get_jwt_token(user.id, user.email, datetime.utcnow()+timedelta(**{unit: time}))
        
        return user.to_dict(), access_token, refresh_token
    
class GoogleAuthenticator(Authenticator):
    def authorize(self, credential:str, token_expires:int = 20, expiry_unit:str = "minutes"):
        user_info = id_token.verify_oauth2_token(credential, requests.Request(), env_config.GOOGLE_CLIENT_ID)
        
        email = user_info['email']
        
        user = self.session.get(User, email=email)
        if not user:
            user = User(**{
                "id": generate_primary_key("USR"), 
                "email": email, 
                "created_at": datetime.now(timezone.utc), 
                "external_type": "google"
            })
            self.session.add(user)
            self.session.commit()
            
        token = get_jwt_token(user.id, user.email, datetime.utcnow()+timedelta(**{expiry_unit: token_expires}))
        
        return user.to_dict(), token
    