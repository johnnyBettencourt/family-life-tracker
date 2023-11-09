import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks, addTask } from './tasksSlice';
import { BiPlus, BiX } from 'react-icons/bi';

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
        <div className="p-4 md:p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Tasks</h1>

        <div className="mb-6">
            <label htmlFor="tagSearch" className="block text-gray-800 text-sm font-medium mb-2">
                Search by Tag:
            </label>
            <input
                type="text"
                id="tagSearch"
                className="form-input w-full border-gray-300 rounded-md shadow-sm transition ease-in-out duration-150 focus:border-purple-500 focus:ring focus:ring-opacity-50 focus:ring-purple-500"
                value={tagSearch}
                onChange={handleTagSearchChange}
                placeholder="Type a tag to search..."
            />
        </div>

        <div className="mb-6 text-right">
            <button
                onClick={toggleTaskForm}
                className={`inline-flex items-center justify-center w-10 h-10 bg-purple-500 hover:bg-purple-700 text-white rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${showTaskForm ? 'bg-red-500 hover:bg-red-700' : ''}`}
            >
                {showTaskForm ? <BiX size="24" /> : <BiPlus size="24" />}
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