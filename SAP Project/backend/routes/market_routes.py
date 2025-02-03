from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.product import Product, PriceHistory
from backend.models.transaction import Transaction
from backend.services.price_prediction import PricePredictionService
from backend import db
from datetime import datetime

bp = Blueprint('market', __name__, url_prefix='/api/market')

price_predictor = PricePredictionService()

@bp.route('/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    location = request.args.get('location')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    is_organic = request.args.get('is_organic', type=bool)
    
    query = Product.query.filter_by(status='available')
    
    if category:
        query = query.filter_by(category=category)
    if location:
        query = query.filter_by(location=location)
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    if is_organic is not None:
        query = query.filter_by(is_organic=is_organic)
    
    products = query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'category': p.category,
        'price': p.price,
        'quantity': p.quantity,
        'unit': p.unit,
        'location': p.location,
        'seller_id': p.seller_id
    } for p in products])

@bp.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    product = Product(
        seller_id=current_user_id,
        name=data['name'],
        category=data['category'],
        description=data.get('description'),
        quantity=data['quantity'],
        unit=data['unit'],
        price=data['price'],
        quality_grade=data.get('quality_grade'),
        location=data.get('location'),
        is_organic=data.get('is_organic', False)
    )
    
    db.session.add(product)
    
    # Record initial price in price history
    price_history = PriceHistory(
        product_id=product.id,
        price=data['price'],
        source='user_input'
    )
    db.session.add(price_history)
    
    db.session.commit()
    
    return jsonify({
        'message': 'Product created successfully',
        'product_id': product.id
    }), 201

@bp.route('/price-prediction/<int:product_id>', methods=['GET'])
def get_price_prediction(product_id):
    days = request.args.get('days', default=7, type=int)
    forecasts = price_predictor.get_price_forecast(product_id, days)
    
    if not forecasts:
        return jsonify({'error': 'Insufficient data for prediction'}), 400
        
    return jsonify(forecasts)

@bp.route('/transactions', methods=['POST'])
@jwt_required()
def create_transaction():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    product = Product.query.get_or_404(data['product_id'])
    
    if product.quantity < data['quantity']:
        return jsonify({'error': 'Insufficient quantity available'}), 400
        
    transaction = Transaction(
        buyer_id=current_user_id,
        seller_id=product.seller_id,
        product_id=product.id,
        quantity=data['quantity'],
        price_per_unit=product.price,
        total_amount=product.price * data['quantity']
    )
    
    # Update product quantity
    product.quantity -= data['quantity']
    if product.quantity == 0:
        product.status = 'sold'
    
    db.session.add(transaction)
    db.session.commit()
    
    return jsonify({
        'message': 'Transaction created successfully',
        'transaction_id': transaction.id
    }), 201
