import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startAddExpense, addExpense, editExpense, removeExpense } from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import db from "../../firebase/firebase";
const createMockStore = configureMockStore([thunk]);

test("should set up remove expense action", () => {
  const action = removeExpense({ id: "abcabc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "abcabc"
  });
});

test("should set up edit expense action", () => {
  const action = editExpense("121212", { note: "New Note Value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "121212",
    updates: { note: "New Note Value" }
  });
});

test("should setup add expense action with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

// test("should setup add expense action with default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });

test("should add expense to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "Mouse",
    amount: 3000,
    note: "This one is better",
    createdAt: 1000
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return db.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return db.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});
