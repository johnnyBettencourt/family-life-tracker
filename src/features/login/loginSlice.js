import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,  // Initial login state is set to false
    username: 'test',  // Default username
    password: 'test'   // Default password
}

export const loginSlice = createSlice({
    name: 'login', // Name of the slice
    initialState, // Initial state
    reducers: {
        toggleLogin: (state) => {
            // This action toggles the login state between true and false
            state.isLoggedIn = !state.isLoggedIn;
        },
    }
});

export const loginReducer = loginSlice.reducer; // Export the reducer
export const { toggleLogin } = loginSlice.actions; // Export the actions