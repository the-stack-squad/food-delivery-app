// src/services/api.js
import axios from 'axios';

// Axios instance with default configuration
const apiClient = axios.create({
  baseURL: '/api', // Proxy will forward this to the backend
  timeout: 5000,   // Timeout after 5 seconds
  headers: { 'Content-Type': 'application/json' },
});

// Function to send a new message
export const sendMessage = async (message) => {
  try {
    const response = await apiClient.post('/sendMessage', { message });
    return response.data;  // Handle success response
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;  // Handle error
  }
};

// Function to fetch received messages
export const receiveMessages = async () => {
  try {
    const response = await apiClient.get('/receiveMessages');
    return response.data;  // Handle success response
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;  // Handle error
  }
};

// Function to fetch the full chat log (if needed)
export const getChatLog = async () => {
  try {
    const response = await apiClient.get('/chatLog');
    return response.data;  // Handle success response
  } catch (error) {
    console.error('Error fetching chat log:', error);
    throw error;  // Handle error
  }
};
