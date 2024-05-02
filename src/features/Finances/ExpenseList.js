import React from 'react';
import { useSelector, useDispatch } from 'react-redux';  // Import hooks from React Redux
import { deleteExpense } from './financesSlice';  // Import the deleteExpense action
import { BiTrash } from 'react-icons/bi';  // Import the trash icon for delete buttons

const ExpenseList = () => {
    // Retrieve the list of expenses from Redux store
    const expenses = useSelector(state => state.finances.expenses);
    // Hook to dispatch actions
    const dispatch = useDispatch();

    // Handler function to dispatch the deleteExpense action
    const handleDelete = (id) => {
        dispatch(deleteExpense({ id }));
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 transition-all duration-500 ease-in-out border-2 border-gray-100 hover:shadow-xl mt-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Expenses</h1>
            <ul className="list-none pl-0">
                {expenses.map(expense => (
                    <li key={expense.id} className="mb-4 bg-purple-200 rounded-lg shadow-lg p-4 transition-all duration-500 ease-in-out border-2 border-purple-200 hover:shadow-xl">
                        <div className="flex justify-between items-center">
                            <div className="flex-1 pr-4">
                                {/* Display the name and cost of each expense */}
                                <h2 className="text-xl font-semibold text-gray-900">{expense.name} - ${expense.cost}</h2>
                            </div>
                            {/* Button to delete an expense */}
                            <button onClick={() => handleDelete(expense.id)} className="text-red-500 hover:bg-red-100 rounded-full p-1">
                                <BiTrash className="text-xl" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
