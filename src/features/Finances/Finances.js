import React, { useState } from 'react';
import BudgetBar from './BudgetBar';
import ExpenseForm from './ExpenseForm';
import { useSelector } from 'react-redux';
import { selectBudget, selectRemaining, selectSpent } from './financesSlice';
import { BiPlus, BiX } from 'react-icons/bi';

export default function Finances() {
    const budget = useSelector(selectBudget);
    const spent = useSelector(selectSpent);
    const remaining = useSelector(selectRemaining);
    const [showExpenseForm, setShowExpenseForm] = useState(false);

    const toggleExpenseForm = () => setShowExpenseForm(!showExpenseForm);

    return (
        <div className="flex justify-center m-4">
            <div className="w-full max-w-screen-md bg-white rounded-lg shadow">
                <div className="p-4 md:p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Finance Tracker</h1>
                    <BudgetBar budget={budget} spent={spent} remaining={remaining} />
                    <div className="mb-3 text-right">
                        <button
                        onClick={toggleExpenseForm}
                        className={`inline-flex items-center justify-center w-10 h-10 bg-purple-500 hover:bg-purple-700 text-white rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${showExpenseForm ? 'bg-red-500 hover:bg-red-700' : ''}`}>
                        {showExpenseForm ? <BiX size="24" /> : <BiPlus size="24" />}
                    </button>
                    </div>
                    
                    {showExpenseForm && <ExpenseForm />}
                </div>
            </div>
        </div>
    );
}
