from flask import Blueprint, request, jsonify, current_app, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user, login_required, logout_user
import json
import jwt

from .models import db, User

login_manager = LoginManager()
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method=='POST':
        data = json.loads(request.data.decode('utf-8'))
        uname = data.get('username')
        password = data.get('password')
        
        if not uname or not password:
            return make_response(jsonify({'message': 'Need credentials'}), 400)
        
        user = db.session.execute(db.select(User).where(User.username==uname)).scalar()
        
        if user and check_password_hash(user.password, password):
            login_user(user)
            
            token = jwt.encode({'user_id': user.id}, key=current_app.config['SECRET_KEY'], algorithm="HS256")
            
            response = make_response(jsonify({'message': 'Login Successful'}), 200)
            response.set_cookie('token', token, samesite='None', secure=True, path='/', max_age=1800)
            
            return response
        
        else:
            return make_response(jsonify({'message': 'Login Failed', 'reason': 'user does not exist or password is wrong.'}), 400)
    
    return make_response(jsonify({'message': f'{request.method} is not handled on this end point. Please try with POST requests.'}), 404)

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method=='POST':
        data = json.loads(request.data.decode('utf-8'))
        user = User(username=data['username'], email=data['email'], password=generate_password_hash(data['password']))
        db.session.add(user)
        try:
            db.session.commit()
            return make_response(jsonify({'message': 'Registration Successful'}), 201)
        except:
            return make_response(jsonify({'message': 'Registration Failed.'}), 409)
    
    return make_response(jsonify({'message': f'{request.method} is not handled on this end point. Please try with POST requests.'}), 404)
    
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@login_manager.unauthorized_handler
def unauthorized():
    return make_response(jsonify({'message': 'You need to login first.'}), 404)

@auth_bp.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    if request.method == 'GET':
        logout_user()
        return make_response(jsonify({'message': 'logout successful.'}), 200)
    
    return make_response(jsonify({'message': f'{request.method} is not handled on this end point. Please try with GET requests.'}), 404)