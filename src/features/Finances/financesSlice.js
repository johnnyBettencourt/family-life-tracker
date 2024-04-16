import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    budget: 5000,
    expenses: [
        {
            id: 0,
            name: 'rent',
            category: 'Other',
            cost: 1600,
        },
    ],
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
            const newId = state.nextId++;

            const newExpense = {
                id: newId,
                ...action.payload
            }
            state.expenses.unshift(newExpense);
        },
        deleteExpense: (state, action) => {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload.id);
        },
    }
})

export const { updateBudget, addExpense, deleteExpense } = financesSlice.actions
export const financesReducer = financesSlice.reducer;
export const selectBudget = state => state.finances.budget;
export const selectSpent = state => state.finances.spent;
export const selectRemaining = state => state.finances.remaining;
export const selectExpenses = state => state.finances.budget;