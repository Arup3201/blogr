from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, DateTime, func
from flask_login import UserMixin

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    
class Blog(db.Model):
    __tablename__ = 'blogs'
    
    blog_id = Column(Integer, primary_key=True, autoincrement=True)
    author_id = Column(Integer, nullable=False)
    title = Column(String(100), nullable=False)
    content = Column(String(100), nullable=False)
    topic = Column(String(100), nullable=False)
    subtopic = Column(String(100), nullable=False)
    tags = Column(String(100), nullable=False)
    published = Column(DateTime(timezone=True), server_default=func.now())
    updated = Column(DateTime(timezone=True), onupdate=func.now())
    likes = Column(Integer, default=0)
    views = Column(Integer, default=0)
    
class Comment(db.Model):
    __tablename__ = 'comments'
    
    comment_id = Column(Integer, primary_key=True, autoincrement=True)
    blog_id = Column(Integer, nullable=False)
    user_id = Column(Integer, nullable=False)
    comment = Column(String(100), nullable=False)
    commented = Column(DateTime(timezone=True), server_default=func.now())
    
class Question(db.Model):
    __tablename__ = 'questions'
    
    question_id = Column(Integer, primary_key=True, autoincrement=True)
    blog_id = Column(Integer, nullable=False)
    question = Column(String(100), nullable=False)
    options = Column(String(400), nullable=False)
    answer = Column(String(100), nullable=False)