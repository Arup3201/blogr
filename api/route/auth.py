from flask import Blueprint

auth_app = Blueprint('auth', __name__)

def signup():
    return "Signed Up"

def login():
    return 'Logged In'

auth_app.add_url_rule('/signup', view_func=signup, methods=['POST'])
auth_app.add_url_rule('/login', view_func=login, methods=['POST'])