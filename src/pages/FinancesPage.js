import React from 'react'
import Finances from '../features/Finances/Finances'

export default function FinancesPage() {
    return (
        <div className='w-full px-4 md:px-10 py-6 text-gray-700'>
            <div className='max-w-4xl mx-auto'>
                <Finances />
            </div>
        </div>
    )
}