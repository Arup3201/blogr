from flask import jsonify, make_response, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

from app.base_model import db
from app.user_authentication.models import User

class UserService():
    def __init__(self):
        self.session = db.session
        
    def create_account(self, data):
        user = User(username=data['username'], email=data['email'], password=generate_password_hash(data['password']))
        self.session.add(user)
        try:
            self.session.commit()
            return make_response(jsonify({'message': 'Registration Successful'}), 201)
        except:
            return make_response(jsonify({'message': 'Registration Failed.'}), 409)
    
    def login(self, data):
        uname = data.get('username')
        password = data.get('password')
        
        if not uname or not password:
            return make_response(jsonify({'message': 'Need credentials'}), 400)
        
        user = db.session.execute(db.select(User).where(User.username==uname)).scalar()
        
        if user and check_password_hash(user.password, password):
            token = jwt.encode({'user_id': user.id}, key=current_app.config['SECRET_KEY'], algorithm="HS256")
            
            response = make_response(jsonify({'message': 'Login Successful'}), 200)
            response.set_cookie('token', token, samesite='None', secure=True, path='/', max_age=1800)
            
            return response
        
        else:
            return make_response(jsonify({'message': 'Login Failed', 'reason': 'user does not exist or password is wrong.'}), 400)
    