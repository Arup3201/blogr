from flask import Blueprint, request
from flask_login import login_required
from app.blog_management.services import BlogService

blog_bp = Blueprint('blog', __name__)

@blog_bp.route('/create_blog', methods=['POST'])
@login_required
def create_blog():
    # Form data
    title = request.form['title']
    topic = request.form['topic']
    subtopic = request.form['subtopic']
    tags = request.form['tags']
    
    service = BlogService()
    res = service.create_blog({'title': title, 'topic': topic, 'subtopic': subtopic, 'tags': tags})
    
    return res


@blog_bp.route('/view_blog', methods=['GET'])
@login_required
def view_blog():
    blog_id = request.args.get('id', '')
    blog_id = int(blog_id)
    
    service = BlogService()
    res = service.get_blog(blog_id)
    return res

@blog_bp.route('/create_comment', methods=['POST'])
@login_required
def create_comment():
    if request.method == 'POST':
        blog_id = request.args.get('blog_id', '')
        user_id = request.args.get('user_id', '')
        
        blog_id = int(blog_id)
        user_id = int(user_id)
        
        service = BlogService()
        res = service.make_comment(blog_id)
        return res
        
@blog_bp.route('/get_comments', methods=['GET'])
@login_required
def get_comments():
    blog_id = request.args.get('blog_id', '')
    blog_id = int(blog_id)
    
    service = BlogService()
    res = service.get_comments(blog_id)
    return res