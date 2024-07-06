from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
import os
from pathlib import Path
from app.models import db, User, Blog

auth_bp = Blueprint('auth', __name__)
blog_bp = Blueprint('blog', __name__)

login_manager = LoginManager()

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method=='POST':
        uname = request.form['username']
        password = request.form['password']
        user = db.session.execute(db.select(User).where(User.username==uname)).scalar()
        
        if user and check_password_hash(user.password, password):
            login_user(user)
            return jsonify({'message': 'Login Successful'}), 200
        
        else:
            return jsonify({'message': 'Login Failed', 'reason': 'user does not exist or password is wrong.'}), 400
    
    return jsonify({'message': f'{request.method} is not handled on this end point. Please try with POST requests.'}), 404

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method=='POST':
        user = User(username=request.form['username'], email=request.form['email'], password=generate_password_hash(request.form['password']))
        db.session.add(user)
        
        try:
            db.session.commit()
            return jsonify({'message': 'Registration Successful'}), 201
        except:
            return jsonify({'message': 'Registration Failed.', 'Reasons': '1. Please make sure no field values are empty. Fields: username, email, password.\n2.Other user with same username/email is present in the database'}), 409
    
    return jsonify({'message': f'{request.method} is not handled on this end point. Please try with POST requests.'}), 404
    
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@login_manager.unauthorized_handler
def unauthorized():
    # do stuff
    return jsonify({'message': 'You need to login first.'}), 404

@auth_bp.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    if request.method == 'GET':
        logout_user()
        return jsonify({'message': 'logout successful.'}), 200
    
    return jsonify({'message': f'{request.method} is not handled on this end point. Please try with GET requests.'}), 404


ALLOWED_EXTENSIONS = {'txt', 'md'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@blog_bp.route('/create_blog', methods=['GET', 'POST'])
@login_required
def create_blog():
    if request.method == 'POST':
        # Form data
        title = request.form['title']
        topic = request.form['topic']
        subtopic = request.form['subtopic']
        tags = request.form['tags']
        
        blog = Blog(author_id=current_user.id, title=title, topic=topic, subtopic=subtopic, tags=tags)
        db.session.add(blog)
        
        try:
            db.session.commit()
            
            # Get the filename as the blog id
            filename = str(blog.blog_id) + '.md'
            
            # Check whether the folder exists or not
            filedir = os.path.join(Path(current_app.root_path).parent, current_app.config['BLOGS_FOLDER'])
            
            if not os.path.exists(filedir):
                os.makedirs(filedir)

            filepath = os.path.join(filedir, filename)
            
            if 'content' in request.form:
                content = request.form['content']
                with open(filepath, 'w') as f:
                    f.write(content)

            elif 'content' in request.files:
                content = request.files['content']
                
                if allowed_file(content.filename):
                    content.save(filepath)
                else:
                    jsonify({'message': 'Unsupported file format.'}), 409

            else:
                return jsonify({'message': 'You can\'t keep the content empty.'}), 409
            
            return jsonify({'message': 'Blog created successfully'}), 201
        
        except:
            return jsonify({'message': 'Blog could not be created.'}), 409

    return jsonify({'message': f'{request.method} is not handled on this end point. Please try with POST requests.'}), 404

@blog_bp.route('/view_blog', methods=['GET'])
@login_required
def view_blog():
    blog_id = request.args.get('id', '')
    
    if blog_id != '':
        blog_id = int(blog_id)
        blog = db.session.execute(db.select(Blog).where(Blog.blog_id==blog_id)).scalar()
        
        if blog:
            filename = str(blog_id)+'.md'
            
            with open(os.path.join(current_app.config['BLOGS_FOLDER'], filename), 'r') as f:
                content = f.read()
            
            return jsonify({'title': blog.title, 'author': blog.author_id, 'content': content, 'topic': blog.topic, 'subtopic': blog.subtopic, 'tags': blog.tags, 'views': blog.views, 'likes': blog.likes, 'created': blog.published, 'updated': blog.updated}), 201
        else:
            return jsonify({'message': 'Blog does not exists.'}), 404