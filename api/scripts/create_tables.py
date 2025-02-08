import os
from api.env_load import load_env
env_file = os.path.abspath(__file__).split("scripts")[0] + '.env'
load_env(env_file)

from api.session.models import Base
from api.session import RelationalSession

session = RelationalSession()

Base.metadata.create_all(session.engine)