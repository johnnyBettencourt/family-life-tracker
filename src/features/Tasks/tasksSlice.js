import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: [
        {
            id: 1,
            title: 'Complete Project A',
            description: 'Finish all the tasks for Project A by the deadline.',
            dueDate: '2023-12-15',
            completed: false,
        },
        {
            id: 2,
            title: 'Meeting with Team',
            description: 'Attend the weekly team meeting at 10 AM.',
            dueDate: '2023-12-10',
            completed: true,
        },
        {
            id: 3,
            title: 'Prepare Presentation',
            description: 'Create a presentation for the client meeting.',
            dueDate: '2023-12-20',
            completed: false,
        },
    ]
}

const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const { id, title, description, dueDate, completed } = action.payload;
            const existingTask = state.tasks.find((task) => task.id === id);
            if (existingTask) {
                existingTask.title = title;
                existingTask.description = description;
                existingTask.dueDate = dueDate;
                existingTask.completed = completed;
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

export const { addTask, updateTask, deleteTask, toggleTaskCompletion } = tasksSlice.actions;

export default tasksSlice.reducer;