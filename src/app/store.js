import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../features/login/loginSlice";
import { tasksReducer } from "../features/Tasks/tasksSlice";
import { calendarReducer } from '../features/Calendar/calendarSlice'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        tasks: tasksReducer,
        calendar: calendarReducer,
    }
})