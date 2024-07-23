from sqlalchemy import Column, INTEGER, VARCHAR, TIMESTAMP, JSON, func
from app.base_model import db

class Blog(db.Model):
    __tablename__ = 'blogs'
    
    blog_id = Column(INTEGER, primary_key=True, autoincrement=True)
    author_id = Column(INTEGER, nullable=False)
    content = Column(JSON, nullable=False)
    published = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated = Column(TIMESTAMP(timezone=True), onupdate=func.now())
    likes = Column(INTEGER, default=0)
    views = Column(INTEGER, default=0)
    
class Comment(db.Model):
    __tablename__ = 'comments'
    
    comment_id = Column(INTEGER, primary_key=True, autoincrement=True)
    blog_id = Column(INTEGER, nullable=False)
    user_id = Column(INTEGER, nullable=False)
    comment = Column(VARCHAR(100), nullable=False)
    commented = Column(TIMESTAMP(timezone=True), server_default=func.now())
    
class Question(db.Model):
    __tablename__ = 'questions'
    
    question_id = Column(INTEGER, primary_key=True, autoincrement=True)
    blog_id = Column(INTEGER, nullable=False)
    question = Column(VARCHAR(100), nullable=False)
    options = Column(VARCHAR(400), nullable=False)
    answer = Column(VARCHAR(100), nullable=False)