import { useEffect, useState } from "react";

import {
  getExpenses,
  addExpense as addExpenseApi,
  updateExpense as updateExpenseApi,
  deleteExpense as deleteExpenseApi,
} from "../../api/expenseApi";


function ExpensePanel({ tripId }) {

  const [purpose, setPurpose] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [expenses, setExpenses] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // ========================================
  // LOAD EXPENSES FOR THIS TRIP
  // ========================================

  useEffect(() => {

    if (!tripId) {

      setLoading(false);

      return;

    }

    loadExpenses();

  }, [tripId]);


  const loadExpenses = async () => {

    try {

      setLoading(true);


      const res =
        await getExpenses(tripId);


      setExpenses(
        res.data.expenses || []
      );


    } catch (error) {

      console.error(
        "Failed to load expenses:",
        error
      );

      alert(
        "Failed to load expenses."
      );


    } finally {

      setLoading(false);

    }

  };


  // ========================================
  // ADD / UPDATE
  // ========================================

  const handleSubmit = async () => {

    if (
      !purpose.trim() ||
      !amount
    ) {

      alert(
        "Please enter Purpose and Amount"
      );

      return;

    }


    if (Number(amount) <= 0) {

      alert(
        "Amount must be greater than 0"
      );

      return;

    }


    try {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];


      if (editId !== null) {

        // UPDATE

        await updateExpenseApi(
          editId,
          {
            tripId,
            category: purpose,
            description: purpose,
            amount: Number(amount),
            expenseDate: today,
          }
        );


        alert(
          "Expense Updated Successfully"
        );


      } else {

        // ADD

        await addExpenseApi({

          tripId,

          category: purpose,

          description: purpose,

          amount: Number(amount),

          expenseDate: today,

        });


        alert(
          "Expense Added Successfully"
        );

      }


      setPurpose("");

      setAmount("");

      setEditId(null);


      await loadExpenses();


    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to save expense."
      );

    }

  };


  // ========================================
  // EDIT
  // ========================================

  const editExpense = (expense) => {

    setPurpose(
      expense.category ||
      expense.description ||
      ""
    );

    setAmount(
      expense.amount
    );

    setEditId(
      expense.id
    );

  };


  // ========================================
  // DELETE
  // ========================================

  const removeExpense = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to remove this expense?"
      )
    ) {

      return;

    }


    try {

      await deleteExpenseApi(
        id,
        tripId
      );


      alert(
        "Expense Deleted Successfully"
      );


      await loadExpenses();


    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete expense."
      );

    }

  };


  // ========================================
  // TOTAL
  // ========================================

  const total =
    expenses.reduce(
      (sum, item) =>
        sum +
        Number(item.amount || 0),
      0
    );


  // ========================================
  // NO TRIP
  // ========================================

  if (!tripId) {

    return (

      <div className="alert alert-warning">

        No trip selected.

      </div>

    );

  }


  return (

    <>

      <h3 className="mb-4">
        💰 Expense Tracker
      </h3>


      {/* Purpose */}

      <input
        className="form-control mb-3"
        placeholder="Purpose"
        value={purpose}
        onChange={(e) =>
          setPurpose(
            e.target.value
          )
        }
      />


      {/* Amount */}

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
          )
        }
      />


      {/* Add / Update */}

      <button
        className="btn btn-success w-100 mb-4"
        onClick={handleSubmit}
      >

        {editId !== null
          ? "💾 Update Expense"
          : "➕ Add Expense"}

      </button>


      {/* Cancel Edit */}

      {editId !== null && (

        <button
          className="btn btn-secondary w-100 mb-4"
          onClick={() => {

            setEditId(null);

            setPurpose("");

            setAmount("");

          }}
        >

          Cancel Edit

        </button>

      )}


      {/* Loading */}

      {loading && (

        <div className="text-center my-4">

          <div
            className="spinner-border text-success"
          />

          <p className="mt-2">
            Loading expenses...
          </p>

        </div>

      )}


      {/* No Expenses */}

      {!loading &&
        expenses.length === 0 && (

          <div className="text-center text-muted my-4">

            <h5>
              💸 No expenses yet
            </h5>

            <p>
              Add your first travel expense above.
            </p>

          </div>

        )}


      {/* Expense List */}

      {!loading &&
        expenses.map(
          (expense) => (

            <div
              key={expense.id}
              className="card shadow-sm mb-3"
            >

              <div className="card-body">

                <h5>
                  {expense.category ||
                    expense.description}
                </h5>


                <h6 className="text-success">

                  ₹{" "}
                  {Number(
                    expense.amount
                  ).toLocaleString(
                    "en-IN"
                  )}

                </h6>


                <div className="d-flex gap-2 mt-3">

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      editExpense(
                        expense
                      )
                    }
                  >

                    ✏ Edit

                  </button>


                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      removeExpense(
                        expense.id
                      )
                    }
                  >

                    🗑 Remove

                  </button>

                </div>

              </div>

            </div>

          )
        )}


      {/* Total */}

      <div className="card bg-success text-white mt-4">

        <div className="card-body">

          <h4>
            💳 Total Expenses
          </h4>

          <h2>

            ₹{" "}
            {total.toLocaleString(
              "en-IN"
            )}

          </h2>

        </div>

      </div>

    </>

  );

}


export default ExpensePanel;