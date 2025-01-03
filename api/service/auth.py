from datetime import datetime, timezone
from google.auth import jwt

from api.session import RelationalSession
from api.session.models import User
from api.utils import generate_primary_key
from api import env_config

class Authenticator:
    def __init__(self):
        self.session = RelationalSession()
        
    def signup(self, *args, **kwargs):
        raise NotImplementedError("Authenticator need to implement `signup` method")
    
    def login(self, *args, **kwargs):
        raise NotImplementedError("Authenticator need to implement `login` method")

class BlogrAuthenticator(Authenticator):
    
    def signup(self, email, password):
        user = User(**{
            "id": generate_primary_key("USR"), 
            "email": email, 
            "password": password, 
            "created_at": datetime.now(timezone.utc)
        })
        self.session.add(user)
        return user.to_dict()
    
    def login(self, email, password):
        pass
    
class GoogleAuthenticator(Authenticator):
    def signup(self, credential):
        decoded_credential = jwt.decode(credential, verify=False)
        print(decoded_credential)
    
    def login(self, credential):
        pass