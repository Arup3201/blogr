import unittest

# load env
from api.env_load import load_env
load_env("api/.env")

from api.session import RelationalSession

class TestBase(unittest.TestCase):
    def setUp(self):
        self.session = RelationalSession()
        
    def tearDown(self):
        self.session.session.close()