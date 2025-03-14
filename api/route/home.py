'''
home.py - home routes are defined here

Following functions are handled here -
list of blogs
'''
from flask import Blueprint, make_response, jsonify

home_app = Blueprint('home', __name__)

def get_blogs():
    return make_response(jsonify({'blogs': []}))

home_app.add_url_rule(rule='/blogs', endpoint='blogs', view_func=get_blogs, methods=['GET'])