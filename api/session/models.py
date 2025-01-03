from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import VARCHAR, TIMESTAMP

Base = declarative_base()

class Mixin:
    def to_dict(self):
        return {
            c.name: getattr(c, c.name) for c in self.__table__.columns
        }

class User(Base, Mixin):
    __tablename__ = 'users'
    
    id = Column(VARCHAR(150), primary_key=True)
    created_at = Column(TIMESTAMP)
    
    email = Column(VARCHAR(150))
    
    hash_password = Column(VARCHAR(150))
    password_salt = Column(VARCHAR(150))
    
    external_id = Column(VARCHAR(150)) # Google, Facebook or other external source id
    external_type = Column(VARCHAR(150)) # Google, facebook, openid etc