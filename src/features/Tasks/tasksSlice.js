import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [
        {
            id: 1,
            title: "Buy Groceries",
            description: "Purchase items for the family dinner.",
            completed: false,
            tags: ["shopping", "family"],
            dueDate: "2023-09-30", // Due date in YYYY-MM-DD format
        },
        {
            id: 2,
            title: "Plan Family Vacation",
            description: "Organize a memorable vacation for the family.",
            completed: false,
            tags: ["travel", "family"],
            dueDate: "2023-09-29", // Due date in YYYY-MM-DD format
        },
        {
            id: 3,
            title: "Attend Family Reunion",
            description: "Join the annual family reunion event.",
            completed: true,
            tags: ["event", "family"],
            dueDate: "2023-11-05", // Due date in YYYY-MM-DD format
        },
        {
            id: 4,
            title: "Fix Leaky Faucet",
            description: "Repair the kitchen faucet to prevent water waste.",
            completed: false,
            tags: ["home", "family"],
            dueDate: "2023-10-01", // Due date in YYYY-MM-DD format
        },
        {
            id: 5,
            title: "Help Kids with Homework",
            description: "Assist the children with their school assignments.",
            completed: true,
            tags: ["education", "family"],
            dueDate: "2023-09-29", // Due date in YYYY-MM-DD format
        },
    ],
    nextId: 6,
};

const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newId = state.nextId++;

            const newTask = {
                ...action.payload,
                id: newId,
            }
            state.tasks.unshift(newTask);
        },
        updateTask: (state, action) => {
            const { id, title, description, dueDate, completed, tags } = action.payload;
            const existingTask = state.tasks.find((task) => task.id === id);
            if (existingTask) {
                existingTask.title = title;
                existingTask.description = description;
                existingTask.dueDate = dueDate;
                existingTask.completed = completed;
                existingTask.tags = tags;
            }
        },
        deleteTask: (state, action) => {
            const taskId = action.payload;
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },
        toggleTaskCompletion: (state, action) => {
            const taskId = action.payload;
            const existingTask = state.tasks.find((task) => task.id === taskId);
            if (existingTask) {
                existingTask.completed = !existingTask.completed;
            }
        },
    },
});

export const selectTasks = (state) => state.tasks.tasks;

export const tasksReducer = tasksSlice.reducer;
export const { addTask, updateTask, deleteTask, toggleTaskCompletion } = tasksSlice.actions;