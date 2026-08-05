import os
from app import create_app, db
from app.utils.seed_data import seed_all_data
from flask_migrate import Migrate

app = create_app(os.getenv('FLASK_ENV', 'development'))
migrate = Migrate(app, db)

@app.cli.command('seed')
def seed():
    """Seed the database with demo data."""
    with app.app_context():
        seed_all_data()
        print('Database seeded successfully!')

@app.cli.command('init-db')
def init_db():
    """Initialize the database."""
    with app.app_context():
        db.create_all()
        print('Database initialized!')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
