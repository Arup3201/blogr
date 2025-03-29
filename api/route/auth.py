'''
auth.py - routes defined for authenticating users

currently supported authentication methods - general blogr and google
'''

import json, traceback, datetime
from flask import Blueprint, request, make_response, jsonify

from service.auth import BlogrAuthenticator, GoogleAuthenticator
from constants import ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES
from utils import split_time

auth_app = Blueprint('auth', __name__)

def signup():
    payload = json.loads(request.data.decode('UTF-8'))    
    email = payload.pop("email")
    password = payload.pop("password")
    
    authenticator = BlogrAuthenticator()
    try:
        data = authenticator.signup(email, password)
        return make_response(jsonify({"data": data}))
    except Exception as e:
        traceback.print_exc()
        return make_response(jsonify({"message": str(e)}), 400)

def login():
    payload = json.loads(request.data.decode('UTF-8'))
    email = payload.pop("email")
    password = payload.pop("password")
    
    authenticator = BlogrAuthenticator()
    try:
        user, access_token, refresh_token = authenticator.login(email, password)
        
        response = make_response(jsonify({"user": user, "accessToken": access_token}), 200)
        
        time, unit = split_time(REFRESH_TOKEN_EXPIRES)
        response.set_cookie("blogr", refresh_token, expires=datetime.datetime.now()+datetime.timedelta(**{unit: time}), secure=True, httponly=True, samesite="Lax", domain=request.host, path="/")
        
        return response
    except Exception as e:
        traceback.print_exc()
        return make_response(jsonify({"message": str(e)}), 400)

def google_authorize():
    payload = json.loads(request.data.decode('UTF-8'))
    credential = payload.pop("credential")
    
    authenticator = GoogleAuthenticator()
    try:
        print(request.url_root)
        user, token = authenticator.authorize(credential)
        response = make_response(jsonify({"user": user}), 200)
        response.set_cookie(token, expires=datetime.datetime.utcnow()+datetime.timedelta(minutes=20), secure=True, httponly=True, samesite="None", domain=request.url_root)
        return response
    except Exception as e:
        traceback.print_exc()
        return make_response(jsonify({"message": str(e)}), 400)

def refresh_token():
    token = request.cookies.get('blogr')
    if not token:
        return make_response(jsonify({'message': 'No refresh token found'}), 403)
    
    authenticator = BlogrAuthenticator()
    
    try: 
        access_token = authenticator.refresh_token(token)
        return make_response(jsonify({"accessToken": access_token}), 200)
    except Exception as e:
        traceback.print_exc()
        return make_response(jsonify({'message': str(e)}), 403)

auth_app.add_url_rule('/signup', view_func=signup, methods=['POST'])
auth_app.add_url_rule('/login', view_func=login, methods=['POST'])
auth_app.add_url_rule('/google/authorize', view_func=google_authorize, methods=['POST'])
auth_app.add_url_rule('/refresh', view_func=refresh_token, methods=['GET'])