import os

def load_env(filename=".env"):
    with open(filename, 'r') as f:
        for line in f:
            if not line.startswith('#'):
                key, value = line.strip().split("=")
                os.environ[key] = value
            