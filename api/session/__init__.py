from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from api import env_config

class RelationalSession:
    def __init__(self):
        self.engine = create_engine(url=f"postgresql+psycopg://{env_config.DB_USER}:{env_config.DB_PASSWORD}@{env_config.DB_HOST}:{env_config.DB_PORT}/blogr")
        self.session = Session(self.engine)
    
    def add(self, user):
        self.session.add(user)
        
    def commit(self):
        self.session.commit()