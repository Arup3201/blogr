import random, string

def generate_primary_key(prefix="", len=6, chars=string.ascii_lowercase+string.ascii_uppercase+string.digits):
    return prefix + ''.join([random.SystemRandom().choice(chars) for _ in range(len)])