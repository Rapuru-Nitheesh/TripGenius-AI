import axios from "axios";

const API = "http://https://tripgenius-ai-backend-29n7.onrender.com/api/achievements";

export const getAchievements = (userId) =>
  axios.get(`${API}/${userId}`);

export const addAchievement = (data) =>
  axios.post(API, data);

export const updateAchievement = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteAchievement = (id) =>
  axios.delete(`${API}/${id}`);