import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from './financesSlice';  // Importing the action to add an expense to the store

const ExpenseForm = () => {
    const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
    // State to handle form inputs with initial values
    const [formData, setFormData] = useState({
        name: '', // Input for the name of the expense
        cost: ''  // Input for the cost of the expense, initialized as an empty string for UX
    });

    // State to control the visibility of the form, initially hidden
    const [showForm, setShowForm] = useState(false);

    // Effect to show the form shortly after component mounts, used for transition effects
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowForm(true); // Show the form after 10ms, can be used to apply transition effects
        }, 10);
        return () => clearTimeout(timer); // Cleanup to prevent memory leak if the component unmounts before the timer fires
    }, []);

    // Handler for form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // If the input name is 'cost', parse it as float for numerical calculations; else keep as string
        const newValue = name === 'cost' ? parseFloat(value) || 0 : value;
        setFormData({
            ...formData,    // Spread the existing form data
            [name]: newValue, // Update the changed value dynamically using computed property names
        });
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (formData.name && formData.cost > 0) { // Ensure that the form data is valid
            dispatch(addExpense(formData)); // Dispatch the addExpense action with the form data
            setFormData({ // Reset the form data to initial state for new entries
                name: '',
                cost: ''
            });
        }
    };

    // Component rendering the form
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
