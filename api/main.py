# Add the filepath for import support
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__ ))))

from flask import Flask

from api.route.auth import auth_app

app = Flask(__name__)

app.register_blueprint(auth_app, url_prefix='/api/auth')

if __name__=="__main__":
    app.run(port=81, debug=True)