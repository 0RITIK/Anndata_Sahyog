from backend import app, db
from backend.models.user import User
from backend.models.product import Product, ProductImage, PriceHistory
from backend.models.transaction import Transaction, Review, Message

def init_db():
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Check if we already have users
        if User.query.first() is None:
            # Create sample admin user
            admin = User(
                email='admin@example.com',
                name='Admin User',
                user_type='admin',
                location='System'
            )
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
            
            print('Created admin user: admin@example.com')
        
        print('Database initialized successfully!')

if __name__ == '__main__':
    init_db()
