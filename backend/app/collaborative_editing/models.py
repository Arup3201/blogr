from sqlalchemy import Column, INTEGER, JSON
from app.base.model import db

class Draft(db.Model):
    __tablename__ = 'drafts'
    
    draft_id = Column(INTEGER, primary_key=True, autoincrement=True)
    content = Column(JSON, nullable=False)