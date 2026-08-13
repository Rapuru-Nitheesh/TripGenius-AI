import axios from "axios";

const API = axios.create({
  baseURL: "http://https://tripgenius-ai-backend-29n7.onrender.com/api/trips",
});

export const createTrip = (tripData) => {
  return API.post("/create", tripData);
};

export const getTrips = (userId) => {
  return API.get(`/user/${userId}`);
};

export const updateTrip = (id, tripData) => {
  return API.put(`/update/${id}`, tripData);
};

export const deleteTrip = (id) => {
  return API.delete(`/delete/${id}`);
};