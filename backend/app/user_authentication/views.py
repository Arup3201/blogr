from flask import Blueprint, request
import json

from app.user_authentication.services import UserService

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = json.loads(request.data.decode('utf-8'))
    service = UserService()
    res = service.login(data)
    return res
    
@auth_bp.route('/register', methods=['POST'])
def register():
    data = json.loads(request.data.decode('utf-8'))
    service = UserService()
    res = service.create_account(data)
    return res
    