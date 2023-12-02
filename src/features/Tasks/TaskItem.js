import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask, toggleTaskCompletion } from './tasksSlice';
import { BiEdit, BiTrash, BiCheckCircle, BiXCircle, BiSave } from 'react-icons/bi';

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
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    return (
        <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 transition-all duration-500 ease-in-out border-2 border-gray-100 hover:shadow-xl ${isDeleted ? 'opacity-0 scale-95' : isEditing ? 'scale-105' : 'scale-100'}`}>
            <div className="flex justify-between items-center">
                <div className={`flex-1 ${isEditing ? '' : 'pr-4'}`}>
                    {isEditing ? (
                        // Edit mode: Show input fields for editing task details
                        <div>
                            <input
                                type="text"
                                className="w-full border rounded-md py-2 px-3 mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={editedTask.title}
                                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                placeholder="Task title"
                            />
                            <textarea
                                className="w-full border rounded-md py-2 px-3 mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={editedTask.description}
                                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                placeholder="Task description"
                            />
                            <input
                                type="date"
                                className="w-full border rounded-md py-2 px-3 mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={editedTask.dueDate}
                                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                            />
                            <input
                                type="text"
                                className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={editedTask.tags.join(', ')}
                                onChange={(e) => setEditedTask({ ...editedTask, tags: e.target.value.split(', ') })}
                                placeholder="Tags (comma separated)"
                            />
                        </div>
                    ) : (
                        // View mode: Display task details
                        <div>
                            <h2 className={`text-xl font-semibold mb-2 ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                {task.title}
                            </h2>
                            <p className="text-gray-600">{task.description}</p>
                            <p className="text-sm text-gray-500 mb-2">Due: {formatDate(task.dueDate)}</p>
                            <div className="flex flex-wrap gap-2">
                                {task.tags.map((tag, index) => (
                                    <span key={index} className="bg-purple-200 text-purple-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    {isEditing ? (
                        // Edit mode: Show "Save" and "Cancel" buttons
                        <>
                            <button
                                onClick={handleSaveEditedTask}
                                className="text-purple-600 hover:bg-purple-100 rounded-full p-1 mx-2"
                            >
                                <BiSave className="text-xl mr-2" />
                            </button>
                            <button
                                onClick={() => setEditing(false)}
                                className="text-red-500 hover:bg-red-100 rounded-full p-1"
                            >
                                <BiXCircle className="text-xl" />
                            </button>
                        </>
                    ) : (
                        // View mode: Show buttons for completing, editing, and deleting tasks
                        <>
                            <button
                                onClick={handleToggleCompletion}
                                className={`mr-2 p-1 rounded-full ${task.completed ? 'text-green-500 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-100'}`}
                            >
                                {task.completed ? <BiCheckCircle className="text-xl" /> : <BiXCircle className="text-xl" />}
                            </button>
                            <button
                                onClick={() => setEditing(true)}
                                className="text-purple-600 hover:bg-purple-100 rounded-full p-1 mr-2"
                            >
                                <BiEdit className="text-xl" />
                            </button>
                            <button
                                onClick={handleDeleteTask}
                                className="text-red-500 hover:bg-red-100 rounded-full p-1"
                            >
                                <BiTrash className="text-xl" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskItem;