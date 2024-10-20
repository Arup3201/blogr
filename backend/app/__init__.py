from flask_migrate import Migrate
from flask_cors import CORS
from instance.config import DevelopmentConfig, ProductionConfig
import os

from app.base.app_server import AppServer

def create_app(config_name=None):
    application = AppServer('BlogR.AI', instance_relative_config=True)
    
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV') or 'development'
    
    if config_name == 'development':
        application.config.from_object(DevelopmentConfig)
    else:
        application.config.from_object(ProductionConfig)

    # Build the database model
    from app.base.model import db
    from app.user_authentication.models import User
    from app.blog_management.models import Blog, Comment, Question
    db.init_app(application)
    with application.app_context():
        db.create_all()
    
    # Avoid Cross Origin Request Errors and also allow credentials to be passed (e.g. cookies)
    CORS(application, supports_credentials=True)
    
    # Create migration for database in case modification in the database
    Migrate(application, db, compare_type=True)
    
    # Authentication and Blog blueprints
    from app.user_authentication.views import auth_bp
    from app.blog_management.views import blog_bp
    application.register_blueprint(auth_bp, url_prefix='/auth')
    application.register_blueprint(blog_bp, url_prefix='/blog')
    
    return application