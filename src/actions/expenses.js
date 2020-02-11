import uuid from "uuid";
import db from "../firebase/firebase";

// export const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 } = {}) => ({
//   type: "ADD_EXPENSE",
//   expense: {
//     id: uuid(),
//     description,
//     amount,
//     createdAt,
//     note
//   }
// });
export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const { description = "", note = "", amount = 0, createdAt = 0 } = expenseData;
    const expense = { description, note, amount, createdAt };
    return db
      .ref("expenses")
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});
