import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask, toggleTaskCompletion } from './tasksSlice';
import { BiEdit, BiTrash, BiCheckCircle, BiPencil } from 'react-icons/bi';

const TaskItem = ({ task, isAdded, setAdded }) => {
    const dispatch = useDispatch();
    const [isEditing, setEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });
    const [isDeleted, setDeleted] = useState(false);

    useEffect(() => {
        // Reset the 'isAdded' state after a short delay to control animations
        if (isAdded) {
            setTimeout(() => {
                setAdded(false);
            }, 500);
        }
    }, [isAdded, setAdded]);

    const handleToggleCompletion = () => {
        // Dispatch the 'toggleTaskCompletion' action to toggle task completion status
        dispatch(toggleTaskCompletion(task.id));
    };

    const handleDeleteTask = () => {
        // Set 'isDeleted' to trigger the deletion animation
        setDeleted(true);

        // Delete the task after the animation completes
        setTimeout(() => {
            dispatch(deleteTask(task.id));
        }, 500);
    };

    const handleSaveEditedTask = () => {
        // Dispatch the 'updateTask' action with the edited task data
        dispatch(updateTask(editedTask));

        // Exit editing mode
        setEditing(false);
    };

    return (
        <div className={`bg-purple-200 rounded-lg shadow-md p-4 mb-4 transform transition-transform duration-500 ${isDeleted ? 'scale-0' : isEditing ? 'scale-105' : isAdded ? 'scale-0' : 'scale-100'}`}>
            <div className="flex justify-between items-center">
                <div>
                    {isEditing ? (
                        // Edit mode: Show input fields for editing task details
                        <div>
                            <input
                                type="text"
                                className="w-full border rounded-md py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={editedTask.title}
                                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                            />
                            <textarea
                                className="w-full border rounded-md py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-3"
                                value={editedTask.description}
                                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            ></textarea>
                            <input
                                type="date"
                                className="w-full border rounded-md py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-3"
                                value={editedTask.dueDate}
                                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                            />
                            <input
                                type="text"
                                className="w-full border rounded-md py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-3"
                                value={editedTask.tags.join(', ')}
                                onChange={(e) => setEditedTask({ ...editedTask, tags: e.target.value.split(', ') })}
                            />
                        </div>
                    ) : (
                        // View mode: Display task details
                        <div>
                            <h2 className={`text-xl font-semibold ${task.completed ? 'line-through' : ''} text-gray-700`}>
                                {editedTask.title}
                            </h2>
                            <p className="text-gray-700">{editedTask.description}</p>
                            <p className="text-sm text-gray-500">Due Date: {editedTask.dueDate}</p>
                            {editedTask.tags.length > 0 && (
                                <p className="text-sm text-gray-500">
                                    Tag: {editedTask.tags.join(', ')}
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    {isEditing ? (
                        // Edit mode: Show "Save" button to save changes
                        <button
                            onClick={handleSaveEditedTask}
                            className="mr-2 px-3 py-1 rounded bg-indigo-500 text-white"
                        >
                            Save
                        </button>
                    ) : (
                        // View mode: Show buttons for completing, editing, and deleting tasks
                        <>
                            <button
                                onClick={handleToggleCompletion}
                                className={`mr-2 px-3 py-1 rounded ${
                                    task.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                                }`}
                            >
                                {task.completed ? <BiCheckCircle /> : <BiPencil />}
                            </button>
                            <button
                                onClick={() => setEditing(true)}
                                className="mr-2 px-3 py-1 rounded bg-indigo-500 text-white"
                            >
                                <BiEdit />
                            </button>
                        </>
                    )}
                    <button
                        onClick={handleDeleteTask}
                        className="px-3 py-1 rounded text-red-600 hover:text-red-800"
                    >
                        <BiTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;