import React from 'react'
import BudgetBar from './BudgetBar';

export default function Finances() {
    return (
        <div className="flex justify-center m-4">
                <div className="p-4 md:p-6 bg-white rounded-lg shadow">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Finance Tracker</h1>
            <h2>budget</h2>
                <BudgetBar />
            </div>
        </div>
    );
}
