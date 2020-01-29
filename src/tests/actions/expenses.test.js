import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

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
  const expenseData = { description: "Rent", note: "Rent Note", amount: 4500, createdAt: 1000 };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test("should setup add expense action with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0
    }
  });
});
