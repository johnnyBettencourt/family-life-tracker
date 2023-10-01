import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks, addTask } from './tasksSlice';
import { BiPlus } from 'react-icons/bi';

const TaskList = () => {
    const dispatch = useDispatch(); // Initializing the Redux dispatch function
    const tasks = useSelector(selectTasks); // Getting the tasks from Redux state
    const [tagSearch, setTagSearch] = useState(''); // Initializing state for tag search
    const [showTaskForm, setShowTaskForm] = useState(false); // Initializing state for showing/hiding task form
    const [added, setAdded] = useState(false); // Initializing state to track if a new task was added

    // Filtering tasks based on tag search
    const searchedTasks = tasks.filter((task) => {
        return task.tags.some((tag) => tag.toLowerCase().includes(tagSearch.toLowerCase()));
    });

    // Handler for changing the tag search input
    const handleTagSearchChange = (e) => {
        setTagSearch(e.target.value);
    };

    // Toggling the display of the task form
    const toggleTaskForm = () => {
        setShowTaskForm(!showTaskForm);
    };

    // Handler for adding a new task
    const handleAddTask = (newTask) => {
        dispatch(addTask(newTask)); // Dispatching the addTask action
        setAdded(true); // Setting added to true when a new task is added
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4 text-grey-900">To-Do</h1>

            {/* Tag search input */}
            <div className="mb-4">
                <label htmlFor="tagSearch" className="block text-gray-900 mb-2">
                    Search by Tag:
                </label>
                <input
                    type="text"
                    id="tagSearch"
                    className="w-full border rounded-md py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={tagSearch}
                    onChange={handleTagSearchChange}
                    placeholder="Search for tags"
                />
            </div>

            {/* Button to toggle task form */}
            <div className="mb-4 text-center">
                <button
                    onClick={toggleTaskForm}
                    className={`bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full ${showTaskForm ? 'bg-red-600 hover:bg-red-800' : ''}`}
                >
                    {showTaskForm ? <span>&times;</span> : <BiPlus />} {/* Icon for add or close */}
                </button>
            </div>

            {/* Task form (if showTaskForm is true) */}
            {showTaskForm && (
                <div className="mb-4">
                    <TaskForm onAddTask={handleAddTask} /> {/* Passing the add task handler as a prop */}
                </div>
            )}

            {/* Rendering TaskItem components for searched tasks */}
            {searchedTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    isAdded={added} // Prop indicating if a new task was added
                    setAdded={setAdded} // Function to set added state
                />
            ))}
        </div>
    );
};

export default TaskList;