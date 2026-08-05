from flask import Flask
from flask_cors import CORS
from .extensions import db, migrate
from .routes import fleet, maintenance, transport, assets, helpdesk, compliance

def create_app(config_name='development'):
    from config import config

    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Enable CORS
    CORS(app, origins=app.config.get('CORS_ORIGINS', '*'))

    # Register blueprints
    app.register_blueprint(fleet.bp, url_prefix='/api/fleet')
    app.register_blueprint(maintenance.bp, url_prefix='/api/maintenance')
    app.register_blueprint(transport.bp, url_prefix='/api/transport')
    app.register_blueprint(assets.bp, url_prefix='/api/assets')
    app.register_blueprint(helpdesk.bp, url_prefix='/api/tickets')
    app.register_blueprint(compliance.bp, url_prefix='/api/compliance')

    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy', 'service': 'cmed-backend', 'version': '1.0.0'}

    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Resource not found'}, 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return {'error': 'Internal server error'}, 500

    return app
