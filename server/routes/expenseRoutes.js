const express = require("express");

const router = express.Router();

const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");


// Get expenses for a specific trip
router.get(
  "/trip/:tripId",
  getExpenses
);


// Add expense
router.post(
  "/",
  addExpense
);


// Update expense
router.put(
  "/:id",
  updateExpense
);


// Delete expense
router.delete(
  "/:id",
  deleteExpense
);


module.exports = router;