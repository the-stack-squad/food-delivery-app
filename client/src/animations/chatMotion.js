// src/animations/chatMotion.js

export const chatBoxAnimation = {
    initial: { opacity: 0, y: 50 },    // Starting hidden state
    animate: { opacity: 1, y: 0 },     // Visible and in place
    exit: { opacity: 0, y: 50 },       // Exit with sliding down and hiding
    transition: { duration: 0.3 }      // Duration of the animation
  };
  