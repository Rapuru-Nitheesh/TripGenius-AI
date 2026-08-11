const expenseModel = require("../models/expenseModel");


// ========================================
// GET EXPENSES FOR TRIP
// ========================================

const getExpenses = async (req, res) => {

  try {

    const { tripId } = req.params;

    if (!tripId) {

      return res.status(400).json({
        success: false,
        message: "Trip ID is required",
      });

    }

    const expenses =
      await expenseModel.getExpensesByTripId(
        tripId
      );

    res.status(200).json({
      success: true,
      expenses,
    });

  } catch (error) {

    console.error(
      "Get Expenses Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get expenses",
    });

  }

};


// ========================================
// ADD EXPENSE
// ========================================

const addExpense = async (req, res) => {

  try {

    const {
      tripId,
      category,
      description,
      amount,
      expenseDate,
    } = req.body;


    if (
      !tripId ||
      !category ||
      !amount
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Trip ID, category and amount are required",
      });

    }


    if (Number(amount) <= 0) {

      return res.status(400).json({
        success: false,
        message:
          "Amount must be greater than 0",
      });

    }


    const expense =
      await expenseModel.addExpense(
        tripId,
        category,
        description || "",
        Number(amount),
        expenseDate
      );


    res.status(201).json({

      success: true,

      message:
        "Expense Added Successfully",

      expense,

    });

  } catch (error) {

    console.error(
      "Add Expense Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to add expense",
    });

  }

};


// ========================================
// UPDATE EXPENSE
// ========================================

const updateExpense = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      tripId,
      category,
      description,
      amount,
      expenseDate,
    } = req.body;


    if (
      !tripId ||
      !category ||
      !amount
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Trip ID, category and amount are required",
      });

    }


    const expense =
      await expenseModel.updateExpense(
        id,
        tripId,
        category,
        description || "",
        Number(amount),
        expenseDate
      );


    if (!expense) {

      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });

    }


    res.status(200).json({

      success: true,

      message:
        "Expense Updated Successfully",

      expense,

    });

  } catch (error) {

    console.error(
      "Update Expense Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update expense",
    });

  }

};


// ========================================
// DELETE EXPENSE
// ========================================

const deleteExpense = async (req, res) => {

  try {

    const { id } = req.params;

    const { tripId } = req.body;


    if (!tripId) {

      return res.status(400).json({
        success: false,
        message: "Trip ID is required",
      });

    }


    const expense =
      await expenseModel.deleteExpense(
        id,
        tripId
      );


    if (!expense) {

      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });

    }


    res.status(200).json({

      success: true,

      message:
        "Expense Deleted Successfully",

    });

  } catch (error) {

    console.error(
      "Delete Expense Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete expense",
    });

  }

};


module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};