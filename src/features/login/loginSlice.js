import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    username: 'test',
    password: 'test'
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        toggleLogin: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
});

export const loginReducer = loginSlice.reducer;
export const { toggleLogin, submitLogin } = loginSlice.actions;