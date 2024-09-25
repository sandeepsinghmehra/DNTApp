

// axios.defaults.withCredentials = true;
// // axios.defaults.baseURL = "http://192.168.39.230:8099/api/v1/"; // Replace with your API base URL
// axios.defaults.baseURL = "http://192.168.1.11:8099/api/v1/"

import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://192.168.39.230:8099/api/v1/', // Replace with your API base URL
  withCredentials: true, // Allow credentials to be sent in requests
});

// Export the Axios instance
export default apiClient;

