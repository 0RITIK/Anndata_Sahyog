from flask import Blueprint, request, jsonify
from flask_socketio import emit
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.message import Message
from app.models.user import User
from app import db, socketio

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/messages/<int:user_id>', methods=['GET'])
@jwt_required()
def get_messages(user_id):
    current_user_id = get_jwt_identity()
    messages = Message.query.filter(
        ((Message.sender_id == current_user_id) & (Message.receiver_id == user_id)) |
        ((Message.sender_id == user_id) & (Message.receiver_id == current_user_id))
    ).order_by(Message.created_at.asc()).all()
    
    return jsonify([message.to_dict() for message in messages]), 200

@chat_bp.route('/messages/<int:user_id>/unread', methods=['GET'])
@jwt_required()
def get_unread_count(user_id):
    current_user_id = get_jwt_identity()
    count = Message.query.filter_by(
        sender_id=user_id,
        receiver_id=current_user_id,
        read=False
    ).count()
    
    return jsonify({'unread_count': count}), 200

@socketio.on('send_message')
@jwt_required()
def handle_message(data):
    current_user_id = get_jwt_identity()
    receiver_id = data.get('receiver_id')
    content = data.get('content')
    
    if not receiver_id or not content:
        return
    
    message = Message(
        sender_id=current_user_id,
        receiver_id=receiver_id,
        content=content
    )
    
    db.session.add(message)
    db.session.commit()
    
    message_dict = message.to_dict()
    # Emit to both sender and receiver
    emit('new_message', message_dict, room=f'user_{current_user_id}')
    emit('new_message', message_dict, room=f'user_{receiver_id}')

@socketio.on('mark_read')
@jwt_required()
def mark_messages_read(data):
    current_user_id = get_jwt_identity()
    sender_id = data.get('sender_id')
    
    if not sender_id:
        return
    
    messages = Message.query.filter_by(
        sender_id=sender_id,
        receiver_id=current_user_id,
        read=False
    ).all()
    
    for message in messages:
        message.read = True
    
    db.session.commit()
    emit('messages_read', {'sender_id': sender_id}, room=f'user_{sender_id}')

@socketio.on('connect')
@jwt_required()
def handle_connect():
    current_user_id = get_jwt_identity()
    # Join a room specific to this user
    join_room(f'user_{current_user_id}')
