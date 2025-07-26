import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import io from 'socket.io-client';

const Chatbot = () => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);


  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Connected to chatbot server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from chatbot server');
      setIsConnected(false);
    });

    newSocket.on('session-joined', (data) => {
      console.log('Joined session:', data.sessionId);
      setSessionId(data.sessionId);
      setUserId(data.userId);
    });

    newSocket.on('conversation-history', (data) => {
      setMessages(data.messages.map(msg => ({
        id: msg._id,
        text: msg.message,
        type: msg.messageType,
        timestamp: new Date(msg.createdAt)
      })));
    });

    newSocket.on('new-message', (data) => {
      const newMessages = [
        {
          id: data.userMessage.id,
          text: data.userMessage.message,
          type: 'user',
          timestamp: new Date(data.userMessage.timestamp)
        },
        {
          id: data.botMessage.id,
          text: data.botMessage.message,
          type: 'bot',
          timestamp: new Date(data.botMessage.timestamp),
          context: data.botMessage.context
        }
      ];
      
      setMessages(prev => [...prev, ...newMessages]);
      setIsTyping(false);
    });

    newSocket.on('conversation-complete', (data) => {
      console.log('Conversation complete:', data);
      // Handle conversation completion
      const completionMessage = {
        id: Date.now(),
        text: "🎉 Thank you for sharing your project details! Our team will review your requirements and get back to you within 24 hours with a personalized proposal. We're excited to help bring your vision to life! 🏠✨",
        type: 'bot',
        timestamp: new Date(),
        isCompletion: true
      };
      setMessages(prev => [...prev, completionMessage]);
    });

    newSocket.on('user-typing', (data) => {
      // Handle other user typing indicator if needed
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate unique user ID if not exists
  useEffect(() => {
    if (!userId) {
      const storedUserId = localStorage.getItem('chatbot_user_id');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('chatbot_user_id', newUserId);
        setUserId(newUserId);
      }
    }
  }, [userId]);

  // Join session when chatbot opens
  useEffect(() => {
    if (isOpen && socket && isConnected && userId && !sessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      socket.emit('join-session', {
        sessionId: newSessionId,
        userId: userId
      });
    }
  }, [isOpen, socket, isConnected, userId, sessionId]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !socket || !sessionId || !userId) return;

    const message = inputMessage.trim();
    setInputMessage('');
    setIsTyping(true);

    // Add user message to UI immediately
    const userMessage = {
      id: Date.now(),
      text: message,
      type: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Send message through Socket.IO
    socket.emit('send-message', {
      sessionId,
      userId,
      message,
      metadata: {
        userAgent: navigator.userAgent,
        ipAddress: 'client-side'
      }
    });

    // Focus back to input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (message) => {
    const isUser = message.type === 'user';
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
            : theme === 'dark' 
              ? 'bg-gray-700 text-white' 
              : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-sm leading-relaxed">{message.text}</p>
          <p className={`text-xs mt-1 ${
            isUser ? 'text-white/70' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {formatTime(message.timestamp)}
          </p>
        </div>
      </motion.div>
    );
  };



  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
        } hover:scale-110 transition-transform duration-200`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ✕
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              💬
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-24 right-6 z-40 w-80 h-96 lg:w-96 lg:h-[500px] rounded-2xl shadow-2xl border ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-white border-gray-200'
            } flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className={`px-4 py-3 border-b ${
              theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎨</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Design Assistant
                    </h3>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {isConnected ? '🟢 Online' : '🔴 Offline'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleChatbot}
                  className={`p-1 rounded-full ${
                    theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                  }`}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🎨</span>
                  </div>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Hi! I'm your interior design assistant. How can I help you today?
                  </p>
                </div>
              ) : (
                messages.map(renderMessage)
              )}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-4"
                >
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${
              theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={!isConnected}
                  className={`flex-1 px-3 py-2 rounded-full text-sm border ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || !isConnected}
                  className={`px-4 py-2 rounded-full text-white text-sm font-medium ${
                    inputMessage.trim() && isConnected
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  } transition-all duration-200`}
                >
                  ➤
                </button>
              </div>
              {!isConnected && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  Connecting to server...
                </p>
              )}
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 