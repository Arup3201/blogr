from flask import Flask as BaseFlask, request, g, jsonify, make_response

class AppServer(BaseFlask):
    
    def _auth(self):
        pass
    
    def preprocess_request(self):
        if request.method in ['GET', 'POST']:
            if request.endpoint not in ['auth.login', 'auth.register']:
                token = request.cookies.get('token', '')
                
                if not token:
                    return make_response(jsonify({'message': 'User not authorized'}), 400)
                
                g['token'] = token
        
        self._auth()
        response = super().preprocess_request()
        return response
    
    def process_response(self, response):
        response = super().process_response(response)
        if request.endpoint not in []:
            pass
        return response