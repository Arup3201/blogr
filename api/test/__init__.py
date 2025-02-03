import unittest

# add api to python system path
# otherwise from api.module import something
# won't be possible
import os, sys
api_dir = os.path.abspath(os.path.join(__file__, os.path.pardir, os.path.pardir))
sys.path.append(api_dir)

class TestBase(unittest.TestCase):
    pass