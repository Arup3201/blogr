from flask import request, jsonify, make_response, current_app
import json, jwt

from app.base_model import db
from app.user_authentication.models import User
from app.blog_management.models import Blog, Comment, Question
from app.blog_management.utils import allowed_file

class BlogService():
    def __init__(self):
        self.session = db.session
    
    def decode_jwt(self, token):
        token = jwt.decode(token, algorithm="HSV256",key=current_app.config['SECRET_KEY'])
        return token['user_id']
    
    def create_blog(self, token, data):
        user_id = self.decode_jwt(token)
        blog = Blog(author_id=user_id, content=json.dumps(data))
        self.session.add(blog)
        
        try:
            self.session.commit()
            
            if 'content' in request.form:
                content = request.form['content']

            elif 'content' in request.files:
                content = request.files['content']
                
                if not allowed_file(content.filename):
                    make_response(jsonify({'message': 'Unsupported file format.'}), 400)

            else:
                return make_response(jsonify({'message': 'You can\'t keep the content empty.'}), 400)
            
            return make_response(jsonify({'message': 'Blog created successfully'}), 200)
        
        except:
            return make_response(jsonify({'message': 'Blog could not be created.'}), 400)
        
    def get_blog(self, token):
        user_id = self.decode_jwt(token)
        
        if not user_id:
            return jsonify({'message': 'blog id missing in the request'})
        
        blog = self.session.execute(db.select(Blog).where(Blog.id==user_id)).scalar()
        content = json.loads(blog.content.decode('utf-8'))
        
        if blog:
            return jsonify({'title': blog.title, 'author': blog.author_id, 'content': content['content'], 'topic': content['topic'], 'subtopic':content['subtopic'], 'tags': content['tags'], 'views': blog.views, 'likes': blog.likes, 'created': blog.published, 'updated': blog.updated}), 200
        else:
            return jsonify({'message': 'Blog does not exist'}), 400
        
    def make_comment(self, token, blog_id, user_id):
        user_id = self.decode_jwt(token)
        
        if not blog_id:
            return make_response(jsonify({'message': 'Need a blog id'}), 400)
        
        if not user_id:
            return make_response(jsonify({'message': 'Need a user id'}), 400)
        
        comment_content = request.form.get('comment', '')
        if not comment_content:
            return make_response(jsonify({'message': 'Need a comment body'}), 400)
        
        user_id = int(user_id)
        comment = Comment(blog_id=blog_id, user_id=user_id, comment=comment_content)
        self.session.add(comment)
        
        try:
            self.session.commit()
            return make_response(jsonify({'message': 'Comment saved'}), 200)
        except:
            return make_response(jsonify({'message': 'Failed to save the comment'}), 400)
        
    def get_comments(self, token, blog_id):
        user_id = self.decode_jwt(token)
        
        if not blog_id:
            return make_response(jsonify({'message': 'blog id missing from request arguments.'}), 400)
        
        comments = self.session.execute(db.select(User, Comment).join(User, User.id==Comment.user_id).where(Comment.blog_id==blog_id))
        
        response = []
        for comment in comments:
            response.append({'user': comment.User.username, 'comment': comment.Comment.comment, 'created': comment.Comment.commented})
        
        return make_response(jsonify({'comments': response}), 200)