import random, string, jwt
from datetime import datetime
from cryptography.fernet import Fernet

import env_config
from constants import ENCODING_STANDARD
from error import JWTTokenError

def generate_primary_key(prefix: str="", len: int=6, chars: str=string.ascii_lowercase+string.ascii_uppercase+string.digits) -> str:
    return prefix + ''.join([random.SystemRandom().choice(chars) for _ in range(len)])

def encrypt_password(password: str) -> tuple[str, str]:
    salt = Fernet.generate_key()
    f = Fernet(salt)
    encrypted_password = f.encrypt(password.encode(ENCODING_STANDARD))
    return encrypted_password.decode(ENCODING_STANDARD), salt.decode(ENCODING_STANDARD)

def decrypt_password(en_password: str, salt: str) -> str:
    f = Fernet(salt.encode(ENCODING_STANDARD))
    decrypted_password = f.decrypt(en_password.encode(ENCODING_STANDARD))
    return decrypted_password.decode(ENCODING_STANDARD)

def get_jwt_token(client_id: str, email: str, expiry_time: datetime) -> str:
    token = jwt.encode({"iss": client_id, 
                        "sub": email, 
                        "aud": "BlogR", 
                        "exp": expiry_time}, 
                       env_config.SECRET_KEY, 
                       algorithm="HS256")
    
    return token

def validate_jwt_token(token: str) -> dict | JWTTokenError:
    try:
        payload = jwt.decode(token, env_config.SECRET_KEY, algorithms=['HS256'])
        return payload
    except (jwt.ExpiredSignatureError, jwt.InvalidSignatureError, jwt.InvalidTokenError) as exc:
        raise JWTTokenError() from exc