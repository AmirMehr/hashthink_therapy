import axios from "axios";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1919';
const API_BASE_URL = "http://localhost:1919";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 60 seconds for transcription
});

// Optional: Add interceptors for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { API_BASE_URL };
