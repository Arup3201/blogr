from api.tests.service import TestBase
from api.service.auth import BlogrAuthenticator

class TestAuth(TestBase):
    
    def test_blogr_signup_success(self):
        email = "arup@gmail.com"
        password = "123456"
        authenticator = BlogrAuthenticator()
        
        user = authenticator.signup(email, password)
        
        # assert no UserNotFoundError
        
        self.assertNotEqual(user, {}, "blogr signup did not create the user")
    
    def test_blogr_signup_duplicate_email(self):
        # assert fail to create account with existing email
        pass
    
    def test_blogr_login_correct(self):
        email = "arup@gmail.com"
        password = "123456"
        authenticator = BlogrAuthenticator()
        
        user, token = authenticator.login(email, password)
        
        # assert no EmailNotFound error
        
        # assert token is not None
    
    def test_blogr_login_incorrect_email(self):
        pass
    
    def test_blogr_login_incorrect_password(self):
        pass
    
    def test_google_signup(self):
        pass
    
    def test_google_login(self):
        pass