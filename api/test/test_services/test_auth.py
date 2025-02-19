from test_services import TestBase
from service.auth import BlogrAuthenticator
from session.models import User
from error import EmailAlreadyExist, EmailNotFound, PasswordMismatch

class TestBlogrSignup(TestBase):
    
    def test_correct_signup(self):
        # deletes previous accounts with this email
        email = "arup@gmail.com"
        password = "123456"
        user = self.session.get(User, email=email)
        self.session.delete(user)
        self.session.commit()
        authenticator = BlogrAuthenticator()
        
        authenticator.signup(email, password)
        
        user = self.session.get(User, email=email)
        self.assertNotEqual(user, None, "blogr signup did not create the user")
    
    def test_duplicate_email(self):
        email = "arup@gmail.com"
        password = "123456"
        authenticator = BlogrAuthenticator()
        
        with self.assertRaises(EmailAlreadyExist, msg="Did not send email already exist error"):
            authenticator.signup(email, password)
    
class TestBlogrLogin(TestBase):
    
    def test_correct_login(self):
        email = "arup@gmail.com"
        password = "123456"
        authenticator = BlogrAuthenticator()
        
        user, token = authenticator.login(email, password)
        
        # assert token is not None
        self.assertNotEqual(user, {}, "could not get user data")
        self.assertNotEqual(token, None, "token is empty after login")
    
    def test_incorrect_email(self):
        email = "arupjana@gmail.com"
        password = "123456"
        authenticator = BlogrAuthenticator()
        
        with self.assertRaises(EmailNotFound, msg="Did not raise email not found error!"):
            authenticator.login(email, password)
    
    def test_incorrect_password(self):
        email = "arup@gmail.com"
        password = "123"
        authenticator = BlogrAuthenticator()
        
        with self.assertRaises(PasswordMismatch, msg="Did not raise password mismatch error!"):
            authenticator.login(email, password)
    
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