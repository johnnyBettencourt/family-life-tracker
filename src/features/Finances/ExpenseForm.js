import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from './financesSlice';  // Make sure you have this action set up correctly

const ExpenseForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        cost: ''
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
        const newValue = name === 'cost' ? parseFloat(value) || 0 : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.cost > 0) {
            // Dispatch the addExpense action with the form data
            dispatch(addExpense(formData));
            // Clear the form data after submitting
            setFormData({
                name: '',
                cost: ''
            });
        }
    };

    return (
        <div className={`bg-purple-200 rounded-lg shadow-md p-4 transform duration-500 ${showForm ? 'scale-100' : 'scale-0'}`}>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                        Expense Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cost" className="block text-gray-700 mb-2">
                        Cost:
                    </label>
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={formData.cost}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                        required
                    />
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition-colors duration-300"
                    >
                        Add Expense
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;
