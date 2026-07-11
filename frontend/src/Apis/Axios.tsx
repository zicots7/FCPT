import axios from "axios";
import toast from "react-hot-toast";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Invalid input. Please check your fields.",
  401: "Invalid username or password.",
  403: "Access denied. You don't have permission.",
  409: "Please Enter Correct Details",
  404: "Requested resource not found.",
  500: "Internal server error. Please try again later.",
};

const api = axios.create({
  baseURL: "http://localhost:8080/FCPT/",
  timeout: 10000, // Optional: gives up after 10s if backend hangs completely
});

// 1. Outgoing Request Interceptor (Your original code - perfectly intact)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. CRITICAL ADDITION: Incoming Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Optional global success rule (e.g., entity created)
      switch (response.status) {
    
      case 201:
        toast.success("Created successfully!");
        break;
      case 204:
        toast.success("Deleted successfully!");
        break;
    }
    return response;
    
  },
  (error) => {
    if (error.response) {
    if (error.response.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        // Redirect to login
        window.location.href = "/login";}
      // Scenario A: Server alive but returned an error status code (4xx, 5xx)
      const message = STATUS_MESSAGES[error.response.status] || "An unexpected error occurred.";
      toast.error(message);
       setTimeout(() => {
    window.location.reload();
  }, 150);
    } else if (error.request) {
      toast.error("Network error. Cannot reach the server.");
    } else {

      toast.error("An error occurred while setting up the request.");
    }
    return Promise.reject(error);
  }
);

export default api;