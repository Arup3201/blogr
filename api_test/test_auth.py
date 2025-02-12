from . import TestBase
from api.service.auth import BlogrAuthenticator

class TestAuth(TestBase):
    
    def test_blogr_signup(self):
        email = "arup@gmail.com"
        password = "123456"
        authenticator = BlogrAuthenticator()
        
        user = authenticator.signup(email, password)
        
        self.assertNotEqual(user, {})
    
    def test_blogr_login(self):
        email = "arup@gmail.com"
        password = "123456"
        authenticator = BlogrAuthenticator()
        
        user, token = authenticator.login(email, password)
        
        print(token)
        
        self.assertNotEqual(user, {})
        self.assertNotEqual(token, None)
    
    def test_google_signup(self):
        pass
    
    def test_google_login(self):
        pass