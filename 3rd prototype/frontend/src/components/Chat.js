import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Badge,
  useTheme,
} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

function Chat({ receiverId, receiverName, onClose }) {
  const theme = useTheme();
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Create socket connection
    const newSocket = io('http://localhost:5000', {
      auth: {
        token: `Bearer ${token}`,
      },
    });

    newSocket.on('connect', () => {
      console.log('Connected to chat server');
    });

    newSocket.on('new_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(newSocket);

    // Fetch existing messages
    fetchMessages();

    return () => {
      newSocket.close();
    };
  }, [receiverId, token]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/chat/messages/${receiverId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    socket.emit('send_message', {
      receiver_id: receiverId,
      content: newMessage,
    });

    setNewMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 320,
        height: 480,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 1000,
      }}
    >
      {/* Chat Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle1">{receiverName}</Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          backgroundColor: theme.palette.grey[50],
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender_id === user.id ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            <Paper
              sx={{
                p: 1,
                px: 2,
                maxWidth: '70%',
                backgroundColor: message.sender_id === user.id
                  ? theme.palette.primary.main
                  : 'white',
                color: message.sender_id === user.id
                  ? 'white'
                  : 'inherit',
              }}
            >
              <Typography variant="body2">
                {message.content}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'right',
                  mt: 0.5,
                  opacity: 0.7,
                }}
              >
                {new Date(message.created_at).toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'white',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                color="primary"
                onClick={handleSend}
                disabled={!newMessage.trim()}
              >
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Paper>
  );
}

export default Chat;
