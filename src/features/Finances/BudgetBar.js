import React from 'react';

export default function BudgetBar({ budget, spent, remaining }) {
    return (
        <div className="`bg-white rounded-lg shadow-lg p-4 mb-4 transition-all duration-500 ease-in-out border-2 border-gray-100 hover:shadow-xl">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Budget Overview</h2>
            <div className="grid grid-cols-3 gap-4 text-gray-800">
                <div>
                    <span className="text-sm font-medium">Current Budget:</span>
                    <span className="block font-semibold">${budget}</span>
                </div>
                <div>
                    <span className="text-sm font-medium">Total Spent:</span>
                    <span className="block font-semibold text-red-500">-${spent}</span>
                </div>
                <div>
                    <span className="text-sm font-medium">Remaining:</span>
                    <span className="block font-semibold text-green-500">${remaining}</span>
                </div>
            </div>
        </div>
    );
}
