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
            state.events = state.events.filter(event => event.id !== action.payload.id);
        },
    }
})

export const { invalidate } = financesSlice.actions
export default financesSlice.reducer