''' 
Just defines a blueprint for all private routes
'''

from flask import Blueprint, request, make_response, jsonify

from utils import validate_jwt_token

private_app = Blueprint('private', __name__)

@private_app.before_request
def authorized():
    auth_header = request.headers['Authorization']
    access_token = auth_header.split('Bearer ')[1]
    try:
        validate_jwt_token(access_token)
    except:
        return make_response(jsonify({'message': 'Unauthorized'}), 403)