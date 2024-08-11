from app import create_app

# Flask application instance with socketio initialized
app = create_app()

if __name__=="__main__":
    app.run(debug=True, port=3000)