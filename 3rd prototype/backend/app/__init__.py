from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.marketplace import marketplace_bp
    from app.routes.predictions import predictions_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(marketplace_bp, url_prefix='/api/marketplace')
    app.register_blueprint(predictions_bp, url_prefix='/api/predictions')

    # Create database tables
    with app.app_context():
        db.create_all()

    return app
