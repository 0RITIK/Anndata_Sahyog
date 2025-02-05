from app import db
from datetime import datetime

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)  # kg, tons, pieces, etc.
    price = db.Column(db.Float, nullable=False)
    quality_grade = db.Column(db.String(20))  # A, B, C, etc.
    location = db.Column(db.String(100))
    is_organic = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    status = db.Column(db.String(20), default='available')  # available, sold, reserved

    def to_dict(self):
        return {
            'id': self.id,
            'seller_id': self.seller_id,
            'name': self.name,
            'category': self.category,
            'description': self.description,
            'quantity': self.quantity,
            'unit': self.unit,
            'price': self.price,
            'quality_grade': self.quality_grade,
            'location': self.location,
            'is_organic': self.is_organic,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'status': self.status
        }
