import React, { useState } from 'react';
import BudgetBar from './BudgetBar';  // Import the BudgetBar component to display budget details
import ExpenseForm from './ExpenseForm';  // Import the form for adding new expenses
import { useSelector } from 'react-redux';  // Hook to access the Redux store's state
import { selectBudget, selectRemaining, selectSpent } from './financesSlice';  // Selectors to retrieve budget data
import { BiPlus, BiX } from 'react-icons/bi';  // Icons for the toggle button
import ExpenseList from './ExpenseList';  // Component that lists all expenses

export default function Finances() {
    // Retrieve budget, spent, and remaining amounts from the store
    const budget = useSelector(selectBudget);
    const spent = useSelector(selectSpent);
    const remaining = useSelector(selectRemaining);

    // State to control the visibility of the ExpenseForm
    const [showExpenseForm, setShowExpenseForm] = useState(false);

    // Function to toggle the visibility of the ExpenseForm
    const toggleExpenseForm = () => setShowExpenseForm(!showExpenseForm);

    return (
        <div className="flex justify-center m-4">
            <div className="w-full max-w-screen-md bg-white rounded-lg shadow">
                <div className="p-4 md:p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Finance Tracker</h1>
                    <BudgetBar budget={budget} spent={spent} remaining={remaining} />
                    <div className="mb-3 text-right">
                        {/* Button to toggle the expense form's visibility */}
                        <button
                        onClick={toggleExpenseForm}
                        className={`inline-flex items-center justify-center w-10 h-10 bg-purple-500 hover:bg-purple-700 text-white rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${showExpenseForm ? 'bg-red-500 hover:bg-red-700' : ''}`}>
                        {showExpenseForm ? <BiX size="24" /> : <BiPlus size="24" />}
                    </button>
                    </div>
                    
                    {/* Conditionally render the ExpenseForm based on showExpenseForm state */}
                    {showExpenseForm && <ExpenseForm />}
                    <ExpenseList />
                </div>
            </div>
        </div>
    );
}
