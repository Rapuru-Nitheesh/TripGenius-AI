import axios from "axios";

const API_URL = "http://https://tripgenius-ai-backend-29n7.onrender.com/api/profile";


// ==========================================
// GET PROFILE
// ==========================================

export const getProfile = (userId) => {
  return axios.get(
    `${API_URL}/${userId}`
  );
};


// ==========================================
// UPDATE PROFILE
// ==========================================

export const updateProfile = (
  userId,
  data
) => {
  return axios.put(
    `${API_URL}/${userId}`,
    data
  );
};


// ==========================================
// CHANGE PASSWORD
// ==========================================

export const changePassword = (
  userId,
  data
) => {
  return axios.put(
    `${API_URL}/${userId}/password`,
    data
  );
};


// ==========================================
// UPLOAD PROFILE PICTURE
// ==========================================

export const uploadProfilePicture = (
  userId,
  file
) => {

  const formData = new FormData();

  formData.append(
    "profilePicture",
    file
  );

  return axios.post(
    `http://https://tripgenius-ai-backend-29n7.onrender.com/api/profile-upload/${userId}`,
    formData
  );
};