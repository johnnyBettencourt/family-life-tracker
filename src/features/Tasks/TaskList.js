// TaskList.js
import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks, addTask } from './tasksSlice';
import { BiPlus } from 'react-icons/bi';

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks);
    const [tagSearch, setTagSearch] = useState('');
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [added, setAdded] = useState(false); // Initialize added as false

    const searchedTasks = tasks.filter((task) => {
        return task.tags.some((tag) => tag.toLowerCase().includes(tagSearch.toLowerCase()));
    });

    const handleTagSearchChange = (e) => {
        setTagSearch(e.target.value);
    };

    const toggleTaskForm = () => {
        setShowTaskForm(!showTaskForm);
    };

    const handleAddTask = (newTask) => {
        dispatch(addTask(newTask));
        setAdded(true); // Set added to true when a new task is added
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4 text-grey-900">To-Do</h1>
            <div className="mb-4">
                <label htmlFor="tagSearch" className="block text-gray-900 mb-2">
                    Search by Tag:
                </label>
                <input
                    type="text"
                    id="tagSearch"
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 placeholder-gray-400"
                    value={tagSearch}
                    onChange={handleTagSearchChange}
                    placeholder="Search for tags"
                />
            </div>

            <div className="mb-4 text-center">
                <button
                    onClick={toggleTaskForm}
                    className={`bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full ${
                        showTaskForm ? 'bg-red-600 hover:bg-red-800' : ''
                    }`}
                >
                    {showTaskForm ? <span>&times;</span> : <BiPlus />}
                </button>
            </div>

            {showTaskForm && (
                <div className="mb-4">
                    <TaskForm onAddTask={handleAddTask} />
                </div>
            )}

            {searchedTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    isAdded={added} // Pass the isAdded prop
                    setAdded={setAdded}
                />
            ))}
        </div>
    );
};

export default TaskList;
