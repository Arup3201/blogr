from flask import g, request, current_app
from flask_socketio import SocketIO, emit, disconnect
import jwt
from jwt import InvalidSignatureError, ExpiredSignatureError

from app.base.constants import bcolors
from app.collaborative_editing.services import EditorService

collaborator = SocketIO()

@collaborator.on('connect')
def handle_connect():
    print(bcolors.BOLD+"Blog collaborator is trying to connect..."+bcolors.ENDC)
    
    token = request.cookies.get('token')
    if not token:
        disconnect()
    
    try:
        user_id = jwt.decode(token, key=current_app.config['SECRET_KEY'], algorithms=['HS256'])
        g.user_id = user_id
    except InvalidSignatureError:
        print("Signature is invalid...")
        disconnect()
    except ExpiredSignatureError:
        print("Signature has expired...")
        disconnect()
    
    emit('connected', {'message': 'Server accepted the connection request...', 'socket_id': request.sid})


@collaborator.on('connection-success')
def connection_success(data):
    print(bcolors.OKGREEN+data+bcolors.ENDC)

@collaborator.on('insert')
def insert_sync(data):
    print(data)

@collaborator.on('delete')
def sync_edit(data):
    print(data)