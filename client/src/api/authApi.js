import axios from "axios";

const API = axios.create({
  baseURL: "https://tripgenius-ai-backend-29n7.onrender.com/api/auth",
});

export const registerUser = (userData) => {
  return API.post("/register", userData);
};

export const loginUser = (userData) => {
  return API.post("/login", userData);
};