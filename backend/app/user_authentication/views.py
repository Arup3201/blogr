from flask import Blueprint, request
import json

from app.user_authentication.services import UserService

auth_bp = Blueprint('auth', __name__)

def login():
    data = json.loads(request.data.decode('utf-8'))
    service = UserService()
    res = service.login(data)
    return res
    
def register():
    data = json.loads(request.data.decode('utf-8'))
    service = UserService()
    res = service.create_account(data)
    return res
    
auth_bp.add_url_rule(rule='/login', methods=['POST'], view_func=login, endpoint='login')
auth_bp.add_url_rule(rule='/register', methods=['POST'], view_func=register, endpoint='register')