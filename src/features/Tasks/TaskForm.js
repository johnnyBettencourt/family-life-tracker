import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './tasksSlice';

const TaskForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        tags: [],
    });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Delay showing the form with a transition
        const timer = setTimeout(() => {
            setShowForm(true);
        }, 10);

        // Clear the timer to avoid memory leaks
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        // Update the form data when input fields change
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTagChange = (e) => {
        // Update the form data for tags input
        setFormData({
            ...formData,
            tags: e.target.value.split(', '),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title) {
            // Dispatch the 'addTask' action with the form data
            dispatch(addTask(formData));
            // Clear the form data after submitting
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                tags: [],
            });
        }
    };

    return (
        <div className={`bg-purple-200 rounded-lg shadow-md p-4 transform duration-500 ${showForm ? 'scale-100' : 'scale-0'}`}>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 mb-2">
                        Task Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 mb-2">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-gray-700 mb-2">
                        Due Date:
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tags" className="block text-gray-700 mb-2">
                        Tags:
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags.join(', ')}
                        onChange={handleTagChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 placeholder-gray-300"
                        placeholder="Add tags separated by commas"
                    />
                </div>

                <div className="text-right">
                <button
    type="submit"
    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition-colors duration-300"
>
    Add Task
</button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;