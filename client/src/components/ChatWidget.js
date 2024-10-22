import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import devImage from '../asset/img/mandela.webp';
import '../css/chatWidget.css';

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'John Doe',
      text: 'Hi, how can I assist you today?',
    },
    {
      sender: 'You',
      text: 'I wanted to ask if you have some East African Food on your specials.',
    },
    {
      sender:  'John Doe',
      text: 'Sure! I can get the menu, price, and the locations we cover to your email',
    },
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'You', text: input }]);
      setInput('');
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
            initial={{ opacity: 0, y: 50 }}    // Starting position (hidden)
            animate={{ opacity: 1, y: 0 }}     // Visible and in place
            exit={{ opacity: 0, y: 50 }}       // Exit animation (slide down and hide)
            transition={{ duration: 0.3 }}     // Duration of the animation
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
            </div>

            {/* Input area */}
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
