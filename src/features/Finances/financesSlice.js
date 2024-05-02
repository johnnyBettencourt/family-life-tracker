import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    budget: 5000,
    expenses: [],
    nextId: 1
}

const financesSlice= createSlice({
    name: "financesSlice",
    initialState,
    reducers: {
        updateBudget: (state, action) => {
            state.budget = action.payload;
        },
        addExpense: (state, action) => {
            const newExpense = {
                id: state.nextId,
                ...action.payload
            };
            state.expenses.unshift(newExpense);
            state.nextId++; //as why += 1 and not ++
        },
        deleteExpense: (state, action) => {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload.id);
        },
    }
})

export const { updateBudget, addExpense, deleteExpense } = financesSlice.actions
export const financesReducer = financesSlice.reducer;
export const selectBudget = state => state.finances.budget;
export const selectExpenses = state => state.finances.expenses;
export const selectSpent = state => state.finances.expenses.reduce((total, expense) => total + expense.cost, 0);
export const selectRemaining = state => state.finances.budget - selectSpent(state);