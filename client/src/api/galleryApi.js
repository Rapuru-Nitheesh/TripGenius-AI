import axios from "axios";

const API = "http://localhost:5000/api/gallery";

// Get Gallery
export const getGallery = (userId) =>
  axios.get(`${API}/${userId}`);

// Upload Image
export const uploadImage = (formData) =>
  axios.post(API, formData);

// Delete Image
export const deleteImage = (id) =>
  axios.delete(`${API}/${id}`);