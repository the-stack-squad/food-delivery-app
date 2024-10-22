// src/components/ChatWidget.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import devImage from '../asset/img/mandela.webp';
import '../css/chatWidget.css';
import { chatBoxAnimation } from '../animations/chatMotion';
import useSocket from '../hooks/useSocket';  // Import useSocket hook

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  const { isConnected, isTyping, sendMessage, startTyping, stopTyping } = useSocket();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage({ sender: 'You', text: input });  // Send message via socket
      setMessages([...messages, { sender: 'You', text: input }]);
      setInput('');
    }
  };

  // Handle typing indicator
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value) {
      startTyping();  // Emit typing event
    } else {
      stopTyping();   // Emit stop typing event
    }
  };

  return (
    <div className="chat-widget">
      {/* Envelope Icon */}
      <div className="chat-icon" onClick={toggleChat}>
        <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
      </div>

      {/* Chat UI */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="chat-box"
            {...chatBoxAnimation}  // Apply animation
          >
            {/* Header */}
            <div className="chat-header">
              <img src={devImage} alt="Alyson Smith" className="profile-pic" />
              <div>
                <h4>Dev Kitchen</h4>
                <p>The Stack Squad</p>
              </div>
              <button className="close" onClick={toggleChat}>Close</button>
            </div>

            {/* Loading state */}
            {!isConnected && (
              <div className="chat-loading">
                <span>Connecting...</span>
              </div>
            )}

            {/* Chat body */}
            <div className="chat-body">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}
                >
                  <span>{msg.text}</span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="typing-indicator">
                  <span>John Doe is typing...</span>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onBlur={stopTyping}  // Stop typing when the user stops typing
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
