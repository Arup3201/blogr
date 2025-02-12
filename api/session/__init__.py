from sqlalchemy import create_engine, and_
from sqlalchemy.orm import Session

from api import env_config

class RelationalSession:
    def __init__(self):
        self.engine = create_engine(url=f"postgresql+psycopg://{env_config.DB_USER}:{env_config.DB_PASSWORD}@{env_config.DB_HOST}:{env_config.DB_PORT}/blogr")
        self.session = Session(self.engine)
    
    def get(self, model, **kwargs):
        conditions = False
        for column_name, value in kwargs.items():
            conditions = and_(getattr(model, column_name) == value)
            
        return self.session.query(model).where(conditions).first()
    
    def add(self, user):
        self.session.add(user)
        
    def commit(self):
        self.session.commit()