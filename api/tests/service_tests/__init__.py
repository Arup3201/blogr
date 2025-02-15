import unittest

# load env
from env_load import load_env
load_env('.env')

from session import RelationalSession

class TestBase(unittest.TestCase):
    def setUp(self):
        self.session = RelationalSession()
        
    def tearDown(self):
        self.session.session.close()