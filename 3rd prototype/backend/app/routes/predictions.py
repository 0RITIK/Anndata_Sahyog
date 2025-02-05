from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models.price_prediction import PricePrediction, HistoricalPrice
from app import db
from datetime import datetime, timedelta
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import numpy as np

predictions_bp = Blueprint('predictions', __name__)

def train_prediction_model(product_category, location):
    # Get historical data
    historical_data = HistoricalPrice.query.filter_by(
        product_category=product_category,
        location=location
    ).order_by(HistoricalPrice.date).all()
    
    if len(historical_data) < 30:  # Need minimum amount of data
        return None, None
    
    # Prepare data for training
    df = pd.DataFrame([{
        'price': h.price,
        'date': h.date,
        'day_of_week': h.date.weekday(),
        'month': h.date.month
    } for h in historical_data])
    
    # Create features
    X = df[['day_of_week', 'month']]
    y = df['price']
    
    # Split data and train model
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Calculate confidence score
    confidence_score = model.score(X_test, y_test)
    
    return model, confidence_score

@predictions_bp.route('/predict', methods=['GET'])
@jwt_required()
def predict_price():
    product_category = request.args.get('category')
    location = request.args.get('location')
    
    if not product_category or not location:
        return jsonify({'error': 'Product category and location are required'}), 400
    
    # Check if we have a recent prediction
    recent_prediction = PricePrediction.query.filter_by(
        product_category=product_category,
        location=location,
        prediction_date=datetime.utcnow().date()
    ).first()
    
    if recent_prediction:
        return jsonify(recent_prediction.to_dict()), 200
    
    # Train model and make prediction
    model, confidence_score = train_prediction_model(product_category, location)
    
    if model is None:
        return jsonify({'error': 'Insufficient historical data for prediction'}), 400
    
    # Make predictions for next 7 days
    predictions = []
    for i in range(7):
        future_date = datetime.utcnow().date() + timedelta(days=i)
        X_pred = pd.DataFrame([{
            'day_of_week': future_date.weekday(),
            'month': future_date.month
        }])
        
        predicted_price = float(model.predict(X_pred)[0])
        
        prediction = PricePrediction(
            product_category=product_category,
            location=location,
            predicted_price=predicted_price,
            confidence_score=confidence_score,
            prediction_date=future_date
        )
        db.session.add(prediction)
        predictions.append(prediction.to_dict())
    
    db.session.commit()
    return jsonify(predictions), 200

@predictions_bp.route('/historical', methods=['GET'])
def get_historical_prices():
    product_category = request.args.get('category')
    location = request.args.get('location')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    if not product_category or not location:
        return jsonify({'error': 'Product category and location are required'}), 400
    
    query = HistoricalPrice.query.filter_by(
        product_category=product_category,
        location=location
    )
    
    if start_date:
        query = query.filter(HistoricalPrice.date >= datetime.strptime(start_date, '%Y-%m-%d').date())
    if end_date:
        query = query.filter(HistoricalPrice.date <= datetime.strptime(end_date, '%Y-%m-%d').date())
    
    historical_prices = query.order_by(HistoricalPrice.date).all()
    return jsonify([price.to_dict() for price in historical_prices]), 200

@predictions_bp.route('/historical', methods=['POST'])
@jwt_required()
def add_historical_price():
    data = request.get_json()
    required_fields = ['product_category', 'location', 'price', 'date']
    
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        price_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
    
    historical_price = HistoricalPrice(
        product_category=data['product_category'],
        location=data['location'],
        price=data['price'],
        date=price_date,
        source=data.get('source', 'user_input')
    )
    
    db.session.add(historical_price)
    db.session.commit()
    
    return jsonify(historical_price.to_dict()), 201
