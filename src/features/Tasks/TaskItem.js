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
        if (isAdded) {
            setTimeout(() => {
                setAdded(false);
            }, 500);
        }
    }, [isAdded, setAdded]);

    const handleToggleCompletion = () => {
        dispatch(toggleTaskCompletion(task.id));
    };

    const handleDeleteTask = () => {
        setDeleted(true);

        setTimeout(() => {
            dispatch(deleteTask(task.id));
        }, 500);
    };

    const handleSaveEditedTask = () => {
        dispatch(updateTask(editedTask));
        setEditing(false);
    };

    return (
        <div className={`bg-purple-200 rounded-lg shadow-md p-4 mb-4 transform transition-transform duration-500 ${isDeleted ? 'scale-0' : isEditing ? 'scale-105' : isAdded ? 'scale-0' : 'scale-100'}`}>
            <div className="flex justify-between items-center">
                <div>
                    {isEditing ? (
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
                        <button
                            onClick={handleSaveEditedTask}
                            className="mr-2 px-3 py-1 rounded bg-indigo-500 text-white"
                        >
                            Save
                        </button>
                    ) : (
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
