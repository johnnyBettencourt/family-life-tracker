import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the tasks
const initialState = {
    tasks: [
        {
            id: 1,
            title: "Buy Groceries",
            description: "Purchase items for the family dinner.",
            completed: false,
            tags: ["shopping", "family"],
            dueDate: "2023-09-30",
        },
        {
            id: 2,
            title: "Plan Family Vacation",
            description: "Organize a memorable vacation for the family.",
            completed: false,
            tags: ["travel", "family"],
            dueDate: "2023-09-29",
        },
        {
            id: 3,
            title: "Attend Family Reunion",
            description: "Join the annual family reunion event.",
            completed: true,
            tags: ["event", "family"],
            dueDate: "2023-11-05",
        },
        {
            id: 4,
            title: "Fix Leaky Faucet",
            description: "Repair the kitchen faucet to prevent water waste.",
            completed: false,
            tags: ["home", "family"],
            dueDate: "2023-10-01",
        },
        {
            id: 5,
            title: "Help Kids with Homework",
            description: "Assist the children with their school assignments.",
            completed: true,
            tags: ["education", "family"],
            dueDate: "2023-09-29",
        },
    ],
    nextId: 6, // Initialize the next task ID
};

// Create a slice of the Redux store for tasks
const tasksSlice = createSlice({
    name: 'task', // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        // Define actions to modify the state
        addTask: (state, action) => {
            // Generate a new ID for the task
            const newId = state.nextId++;

            // Create a new task object based on the action payload
            const newTask = {
                ...action.payload,
                id: newId,
            };

            // Add the new task to the beginning of the tasks array
            state.tasks.unshift(newTask);
        },
        updateTask: (state, action) => {
            // Extract the payload data
            const { id, title, description, dueDate, completed, tags } = action.payload;

            // Find the existing task in the tasks array
            const existingTask = state.tasks.find((task) => task.id === id);

            // If the task exists, update its properties
            if (existingTask) {
                existingTask.title = title;
                existingTask.description = description;
                existingTask.dueDate = dueDate;
                existingTask.completed = completed;
                existingTask.tags = tags;
            }
            
        },
        deleteTask: (state, action) => {
            // Extract the payload (task ID) to be deleted
            const taskId = action.payload;

            // Filter out the task with the matching ID to delete it
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },
        toggleTaskCompletion: (state, action) => {
            // Extract the payload (task ID) to toggle completion status
            const taskId = action.payload;

            // Find the existing task in the tasks array
            const existingTask = state.tasks.find((task) => task.id === taskId);

            // If the task exists, toggle its completion status
            if (existingTask) {
                existingTask.completed = !existingTask.completed;
            }
        },
    },
});

// Export selectors and actions for the tasks slice
export const selectTasks = (state) => state.tasks.tasks;
export const tasksReducer = tasksSlice.reducer;
export const { addTask, updateTask, deleteTask, toggleTaskCompletion } = tasksSlice.actions;