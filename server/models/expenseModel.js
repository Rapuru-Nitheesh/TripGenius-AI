const pool = require("../config/db");


// ========================================
// GET EXPENSES FOR A TRIP
// ========================================

const getExpensesByTripId = async (tripId) => {

  const result = await pool.query(
    `
    SELECT
      id,
      trip_id,
      category,
      description,
      amount,
      expense_date,
      created_at
    FROM expenses
    WHERE trip_id = $1
    ORDER BY created_at DESC
    `,
    [tripId]
  );

  return result.rows;
};


// ========================================
// ADD EXPENSE
// ========================================

const addExpense = async (
  tripId,
  category,
  description,
  amount,
  expenseDate
) => {

  const result = await pool.query(
    `
    INSERT INTO expenses
    (
      trip_id,
      category,
      description,
      amount,
      expense_date
    )
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING
      id,
      trip_id,
      category,
      description,
      amount,
      expense_date,
      created_at
    `,
    [
      tripId,
      category,
      description,
      amount,
      expenseDate || null,
    ]
  );

  return result.rows[0];
};


// ========================================
// UPDATE EXPENSE
// ========================================

const updateExpense = async (
  expenseId,
  tripId,
  category,
  description,
  amount,
  expenseDate
) => {

  const result = await pool.query(
    `
    UPDATE expenses
    SET
      category = $1,
      description = $2,
      amount = $3,
      expense_date = $4
    WHERE
      id = $5
      AND trip_id = $6
    RETURNING
      id,
      trip_id,
      category,
      description,
      amount,
      expense_date,
      created_at
    `,
    [
      category,
      description,
      amount,
      expenseDate || null,
      expenseId,
      tripId,
    ]
  );

  return result.rows[0];
};


// ========================================
// DELETE EXPENSE
// ========================================

const deleteExpense = async (
  expenseId,
  tripId
) => {

  const result = await pool.query(
    `
    DELETE FROM expenses
    WHERE
      id = $1
      AND trip_id = $2
    RETURNING id
    `,
    [
      expenseId,
      tripId,
    ]
  );

  return result.rows[0];
};


module.exports = {
  getExpensesByTripId,
  addExpense,
  updateExpense,
  deleteExpense,
};