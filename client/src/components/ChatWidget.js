import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion'; // Importing AnimatePresence for animations
import '../css/chatWidget.css';

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
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
            <div className="chat-header">
              <h4>Chat with us!</h4>
              <button className='close' onClick={toggleChat}>Close</button>
            </div>
            <div className="chat-body">
              <p>Hello! How can we assist you today?</p>
            </div>
            <div className="chat-input">
              <input type="text" placeholder="Type a message..." />
              <button>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
