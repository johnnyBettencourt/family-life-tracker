import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../features/login/loginSlice";
import { tasksReducer } from "../features/Tasks/tasksSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        tasks: tasksReducer
    }
})