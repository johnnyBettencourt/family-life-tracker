import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBudget } from './financesSlice'; // Import the action for updating the budget

export default function BudgetBar({ budget, spent, remaining }) {
    const [isEditing, setIsEditing] = useState(false); // State to track whether the edit mode is active
    const [editBudget, setEditBudget] = useState(budget); // State for storing the editable budget value
    const dispatch = useDispatch(); // Hook to dispatch actions

    // Function to enable edit mode
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Function to cancel editing, reverting changes
    const handleCancel = () => {
        setIsEditing(false);
        setEditBudget(budget); // Reset the edit budget to the original budget on cancel
    };

    // Function to save the edited budget
    const handleSave = () => {
        dispatch(updateBudget(Number(editBudget))); // Dispatch the action to update the budget in the store
        setIsEditing(false); // Exit edit mode after saving
    };

    // Function to handle changes in the input field
    const handleChange = (event) => {
        setEditBudget(event.target.value); // Update the editBudget state with new input
    };

    // Rendering the component with conditionally displayed elements based on editing state
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 transition-all duration-500 ease-in-out border-2 border-gray-100 hover:shadow-xl">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Budget Overview</h2>
            <div className="grid grid-cols-3 gap-4 text-gray-800">
                <div>
                    <span className="text-lg font-medium">Current Budget:</span>
                    {isEditing ? (
                        <input
                            type="number"
                            value={editBudget}
                            onChange={handleChange}
                            className="ml-2 border rounded text-lg p-1 font-semibold"
                        />
                    ) : (
                        <span className="block font-semibold text-lg">${budget}</span>
                    )}
                </div>
                <div>
                    <span className="text-lg font-medium">Total Spent:</span>
                    <span className="block font-semibold text-red-500 text-lg">-${spent}</span>
                </div>
                <div>
                    <span className="text-lg font-medium">Remaining:</span>
                    <span className="block font-semibold text-green-500 text-lg">${remaining}</span>
                </div>
                {isEditing ? (
                    <div className="col-span-3 flex justify-end space-x-2">
                        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            Save
                        </button>
                        <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="col-span-3 flex justify-end">
                        <button onClick={handleEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                            Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
