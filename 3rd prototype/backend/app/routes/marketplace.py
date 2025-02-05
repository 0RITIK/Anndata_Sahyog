from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.product import Product
from app.models.user import User
from app import db
from datetime import datetime

marketplace_bp = Blueprint('marketplace', __name__)

@marketplace_bp.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_type != 'seller':
        return jsonify({'error': 'Only sellers can create products'}), 403
    
    data = request.get_json()
    required_fields = ['name', 'category', 'quantity', 'unit', 'price']
    
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    product = Product(
        seller_id=current_user_id,
        name=data['name'],
        category=data['category'],
        description=data.get('description'),
        quantity=data['quantity'],
        unit=data['unit'],
        price=data['price'],
        quality_grade=data.get('quality_grade'),
        location=data.get('location', user.location),
        is_organic=data.get('is_organic', False)
    )
    
    db.session.add(product)
    db.session.commit()
    
    return jsonify(product.to_dict()), 201

@marketplace_bp.route('/products', methods=['GET'])
def get_products():
    # Query parameters
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
    return jsonify([product.to_dict() for product in products]), 200

@marketplace_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200

@marketplace_bp.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    current_user_id = get_jwt_identity()
    product = Product.query.get_or_404(product_id)
    
    if product.seller_id != current_user_id:
        return jsonify({'error': 'Unauthorized to update this product'}), 403
    
    data = request.get_json()
    allowed_fields = ['name', 'category', 'description', 'quantity', 'unit', 
                     'price', 'quality_grade', 'location', 'is_organic', 'status']
    
    for field in allowed_fields:
        if field in data:
            setattr(product, field, data[field])
    
    product.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(product.to_dict()), 200

@marketplace_bp.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    current_user_id = get_jwt_identity()
    product = Product.query.get_or_404(product_id)
    
    if product.seller_id != current_user_id:
        return jsonify({'error': 'Unauthorized to delete this product'}), 403
    
    db.session.delete(product)
    db.session.commit()
    
    return jsonify({'message': 'Product deleted successfully'}), 200

@marketplace_bp.route('/products/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '')
    if not query:
        return jsonify({'error': 'Search query is required'}), 400
    
    products = Product.query.filter(
        (Product.name.ilike(f'%{query}%')) |
        (Product.description.ilike(f'%{query}%')) |
        (Product.category.ilike(f'%{query}%'))
    ).filter_by(status='available').all()
    
    return jsonify([product.to_dict() for product in products]), 200
