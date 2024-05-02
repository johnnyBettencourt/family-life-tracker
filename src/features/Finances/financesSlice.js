import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the finance management slice.
const initialState = {
    budget: 5000,  // Initial budget set at $5000.
    expenses: [],  // Array to store individual expense records.
    nextId: 1      // ID to assign to each new expense, ensuring uniqueness.
}

// Create a slice for finance operations with actions to update the state.
const financesSlice = createSlice({
    name: "financesSlice",  // Name of the slice, used in action types.
    initialState,           // The initial state of the slice.
    reducers: {
        // Reducer to update the budget. Payload should contain the new budget amount.
        updateBudget: (state, action) => {
            state.budget = action.payload;
        },
        // Reducer to add a new expense. Payload should contain expense details except the id.
        addExpense: (state, action) => {
            const newExpense = {
                id: state.nextId,  // Assign an ID to the new expense.
                ...action.payload  // Spread other expense details from the action payload.
            };
            state.expenses.unshift(newExpense); // Add the new expense to the beginning of the array.
            state.nextId++;  // Increment the ID for the next expense.
        },
        // Reducer to delete an expense. Payload should contain the id of the expense to delete.
        deleteExpense: (state, action) => {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload.id);
        },
    }
})

// Export the action creators for use in components.
export const { updateBudget, addExpense, deleteExpense } = financesSlice.actions;

// Export the reducer, to be included in the store.
export const financesReducer = financesSlice.reducer;

// Selector to get the current budget from the state.
export const selectBudget = state => state.finances.budget;

// Selector to get all expenses.
export const selectExpenses = state => state.finances.expenses;

// Selector to calculate the total spent by summing the cost of all expenses.
export const selectSpent = state => state.finances.expenses.reduce((total, expense) => total + expense.cost, 0);

// Selector to calculate the remaining budget by subtracting the total spent from the budget.
export const selectRemaining = state => state.finances.budget - selectSpent(state);
