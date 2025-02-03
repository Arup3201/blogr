import unittest

# add api to python system path
# otherwise from api.module import something
# won't be possible
import os, sys
api_dir = os.path.abspath(os.path.join(__file__, os.path.pardir, os.path.pardir))
sys.path.append(api_dir)

from api.session import RelationalSession

class TestBase(unittest.TestCase):
    def setUp(self):
        self.session = RelationalSession()
        
    def tearDown(self):
        self.sessin.session.close()