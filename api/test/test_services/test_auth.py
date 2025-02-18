from test_services import TestBase
from service.auth import BlogrAuthenticator

class TestBlogrSignup(TestBase):
    
    def test_correct_signup(self):
        email = "arup@gmail.com"
        password = "123456"
        authenticator = BlogrAuthenticator()
        
        user = authenticator.signup(email, password)
        
        self.assertNotEqual(user, {}, "blogr signup did not create the user")
    
    def test_duplicate_email(self):
        email = "arup@gmail.com"
        password = "123456"
        authenticator = BlogrAuthenticator()
        
        user = authenticator.signup(email, password)
    
class TestBlogrLogin(TestBase):
    def test_correct_login(self):
        email = "arup@gmail.com"
        password = "123456"
        authenticator = BlogrAuthenticator()
        
        user, token = authenticator.login(email, password)
        
        # assert token is not None
        self.assertNotEqual(user, {})
        self.assertNotEqual(token, None)
    
    def test_incorrect_email(self):
        pass
    
    def test_incorrect_password(self):
        pass
    
    def test_token_expiry(self):
        pass

class TestGoogleSignup(TestBase):
    
    def test_correct_signup(self):
        pass
    
    def test_duplicate_email(self):
        pass


class TestGoogleLogin(TestBase):
    
    def test_correct_login(self):
        pass
    
    def test_incorrect_credentials(self):
        pass
    
    def test_token_expiry(self):
        pass