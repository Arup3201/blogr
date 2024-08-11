from flask import Blueprint, request
from app.blog_management.services import BlogService

blog_bp = Blueprint('blog', __name__)

def create_blog():
    # Form data
    title = request.form['title']
    topic = request.form['topic']
    subtopic = request.form['subtopic']
    tags = request.form['tags']
    
    service = BlogService()
    res = service.create_blog({'title': title, 'topic': topic, 'subtopic': subtopic, 'tags': tags})
    
    return res


def view_blog():
    blog_id = request.args.get('id', '')
    blog_id = int(blog_id)
    
    service = BlogService()
    res = service.get_blog(blog_id)
    return res

def create_comment():
    if request.method == 'POST':
        blog_id = request.args.get('blog_id', '')
        user_id = request.args.get('user_id', '')
        
        blog_id = int(blog_id)
        user_id = int(user_id)
        
        service = BlogService()
        res = service.make_comment(blog_id)
        return res
        
def get_comments():
    blog_id = request.args.get('blog_id', '')
    blog_id = int(blog_id)
    
    service = BlogService()
    res = service.get_comments(blog_id)
    return res

blog_bp.add_url_rule(rule='/create_blog', methods=['POST'], view_func=create_blog, endpoint='create-blog')
blog_bp.add_url_rule(rule='/view_blog', methods=['GET'], view_func=view_blog, endpoint='view-blog')
blog_bp.add_url_rule(rule='/create_comment', methods=['POST'], view_func=create_comment, endpoint='create-comment')
blog_bp.add_url_rule(rule='/get_comments', methods=['GET'], view_func=get_comments, endpoint='get-comments')