# Add the filepath for import support
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__ ))))

from api.env_load import load_env
load_env()

from flask import Flask
from flask_cors import CORS

from api.route.auth import auth_app

from api.route.private import private_app
from api.route.home import home_app

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_app, url_prefix='/api/auth')

home_app.register_blueprint(private_app)
app.register_blueprint(home_app, url_prefix='/api/private/home')

if __name__=="__main__":
    app.run(port=8081, debug=True)