from app import db
from datetime import datetime

class PricePrediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_category = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    predicted_price = db.Column(db.Float, nullable=False)
    confidence_score = db.Column(db.Float)
    prediction_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'product_category': self.product_category,
            'location': self.location,
            'predicted_price': self.predicted_price,
            'confidence_score': self.confidence_score,
            'prediction_date': self.prediction_date.isoformat(),
            'created_at': self.created_at.isoformat()
        }

class HistoricalPrice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_category = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    source = db.Column(db.String(100))  # Source of the price data
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'product_category': self.product_category,
            'location': self.location,
            'price': self.price,
            'date': self.date.isoformat(),
            'source': self.source,
            'created_at': self.created_at.isoformat()
        }
