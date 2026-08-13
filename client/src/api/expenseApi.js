import axios from "axios";

const API_URL =
  "http://https://tripgenius-ai-backend-29n7.onrender.com/api/expenses";


// ========================================
// GET EXPENSES FOR CURRENT TRIP
// ========================================

export const getExpenses = (tripId) => {

  return axios.get(
    `${API_URL}/trip/${tripId}`
  );

};


// ========================================
// ADD EXPENSE
// ========================================

export const addExpense = (data) => {

  return axios.post(
    API_URL,
    data
  );

};


// ========================================
// UPDATE EXPENSE
// ========================================

export const updateExpense = (
  id,
  data
) => {

  return axios.put(
    `${API_URL}/${id}`,
    data
  );

};


// ========================================
// DELETE EXPENSE
// ========================================

export const deleteExpense = (
  id,
  tripId
) => {

  return axios.delete(
    `${API_URL}/${id}`,
    {
      data: {
        tripId,
      },
    }
  );

};