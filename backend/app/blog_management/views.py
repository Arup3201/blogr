from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
import os
from pathlib import Path
from app.base_model import db
from app.user_authentication.models import User
from .models import Blog, Comment, Question

blog_bp = Blueprint('blog', __name__)

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
    if request.method == 'GET':
        blog_id = request.args.get('id', '')
        if not blog_id:
            return jsonify({'message': 'blog id missing in the request'})
        
        blog_id = int(blog_id)
        blog = db.session.execute(db.select(Blog).where(Blog.blog_id==blog_id)).scalar()
        
        if blog:
            filename = str(blog_id)+'.md'
            
            with open(os.path.join(current_app.config['BLOGS_FOLDER'], filename), 'r') as f:
                content = f.read()
            
            return jsonify({'title': blog.title, 'author': blog.author_id, 'content': content, 'topic': blog.topic, 'subtopic': blog.subtopic, 'tags': blog.tags, 'views': blog.views, 'likes': blog.likes, 'created': blog.published, 'updated': blog.updated}), 201
        else:
            return jsonify({'message': 'Blog does not exist'}), 404

@blog_bp.route('/create_comment', methods=['POST'])
@login_required
def create_comment():
    if request.method == 'POST':
        blog_id = request.args.get('blog_id', '')
        if not blog_id:
            return jsonify({'message': 'Need a blog id'}), 404
        
        user_id = request.args.get('user_id', '')
        if not user_id:
            return jsonify({'message': 'Need a user id'}), 404
        
        comment_content = request.form.get('comment', '')
        if not comment_content:
            return jsonify({'message': 'Need a comment body'}), 404
        
        blog_id = int(blog_id)
        user_id = int(user_id)
        comment = Comment(blog_id=blog_id, user_id=user_id, comment=comment_content)
        db.session.add(comment)
        
        try:
            db.session.commit()
            return jsonify({'message': 'Comment saved'}), 201
        except:
            return jsonify({'message': 'Failed to save the comment'}), 404
        
@blog_bp.route('/get_comments', methods=['GET'])
@login_required
def get_comments():
    if request.method == 'GET':
        blog_id = request.args.get('blog_id', '')
        if not blog_id:
            return jsonify({'message': 'blog id missing from request arguments.'})
        
        blog_id = int(blog_id)
        comments = db.session.execute(db.select(User, Comment).join(User, User.id==Comment.user_id).where(Comment.blog_id==blog_id))
        
        response = []
        for comment in comments:
            response.append({'user': comment.User.username, 'comment': comment.Comment.comment, 'created': comment.Comment.commented})
        
        return jsonify(response), 201